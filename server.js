const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_KEY || "YOUR_API_KEY_HERE";
const API_URL = "https://aiproxy.smpad.com/1.0/chats/completions";

const DB_DIR = path.join(__dirname, "storage");
const DB_FILE = path.join(DB_DIR, "interviews.json");
const CANDIDATES_FILE = path.join(DB_DIR, "candidates.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function ensureStorage() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE))
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
  if (!fs.existsSync(CANDIDATES_FILE))
    fs.writeFileSync(CANDIDATES_FILE, JSON.stringify([], null, 2));
}

function readDB(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

function writeDB(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

async function callAI(messages) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-V3",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`AI API error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// --- API Routes ---

app.get("/api/jobs", (_req, res) => {
  const jobs = [
    { id: "software-engineer", title: "Software Engineer", skills: ["JavaScript", "Python", "System Design", "Data Structures"] },
    { id: "data-scientist", title: "Data Scientist", skills: ["Python", "Machine Learning", "Statistics", "SQL"] },
    { id: "product-manager", title: "Product Manager", skills: ["Strategy", "User Research", "Analytics", "Roadmapping"] },
    { id: "devops-engineer", title: "DevOps Engineer", skills: ["AWS", "Docker", "CI/CD", "Linux"] },
    { id: "frontend-developer", title: "Frontend Developer", skills: ["React", "CSS", "JavaScript", "HTML"] },
  ];
  res.json(jobs);
});

app.post("/api/interview/start", async (req, res) => {
  try {
    const { candidateName, candidateEmail, jobRole } = req.body;
    if (!candidateName || !candidateEmail || !jobRole) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const interviewId = uuidv4();
    const systemPrompt = `You are a professional AI interviewer conducting a job interview for the position of "${jobRole}". 
Your role is to:
1. Ask relevant technical and behavioral questions one at a time
2. Evaluate the candidate's responses
3. Be professional, encouraging, and fair
4. Ask follow-up questions based on answers
5. Cover technical skills, problem-solving, teamwork, and career goals
6. After 5-7 questions, provide a summary evaluation

Start by greeting the candidate and asking the first question. Keep responses concise.`;

    const firstMessage = await callAI([
      { role: "system", content: systemPrompt },
      { role: "user", content: `I am ${candidateName}, applying for the ${jobRole} position. I'm ready to start the interview.` },
    ]);

    const interview = {
      id: interviewId,
      candidateName,
      candidateEmail,
      jobRole,
      startedAt: new Date().toISOString(),
      status: "in_progress",
      systemPrompt,
      messages: [
        { role: "assistant", content: firstMessage, timestamp: new Date().toISOString() },
      ],
      evaluation: null,
    };

    const interviews = readDB(DB_FILE);
    interviews.push(interview);
    writeDB(DB_FILE, interviews);

    const candidates = readDB(CANDIDATES_FILE);
    candidates.push({
      id: uuidv4(),
      name: candidateName,
      email: candidateEmail,
      jobRole,
      interviewId,
      date: new Date().toISOString(),
    });
    writeDB(CANDIDATES_FILE, candidates);

    res.json({ interviewId, firstMessage });
  } catch (error) {
    console.error("Start interview error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/interview/respond", async (req, res) => {
  try {
    const { interviewId, answer } = req.body;
    if (!interviewId || !answer) {
      return res.status(400).json({ error: "interviewId and answer are required" });
    }

    const interviews = readDB(DB_FILE);
    const interview = interviews.find((i) => i.id === interviewId);
    if (!interview) return res.status(404).json({ error: "Interview not found" });

    interview.messages.push({ role: "user", content: answer, timestamp: new Date().toISOString() });

    const aiMessages = [
      { role: "system", content: interview.systemPrompt },
      ...interview.messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const aiResponse = await callAI(aiMessages);

    interview.messages.push({ role: "assistant", content: aiResponse, timestamp: new Date().toISOString() });

    writeDB(DB_FILE, interviews);

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Respond error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/interview/end", async (req, res) => {
  try {
    const { interviewId } = req.body;
    if (!interviewId) return res.status(400).json({ error: "interviewId is required" });

    const interviews = readDB(DB_FILE);
    const interview = interviews.find((i) => i.id === interviewId);
    if (!interview) return res.status(404).json({ error: "Interview not found" });

    const evalMessages = [
      { role: "system", content: "You are an expert interview evaluator. Provide a detailed evaluation of the candidate based on the interview transcript. Format your response as:\n\nOVERALL SCORE: X/10\nSTRENGTHS:\n- ...\nAREAS FOR IMPROVEMENT:\n- ...\nDETAILED ASSESSMENT:\n..." },
      { role: "user", content: `Interview for ${interview.jobRole} position with ${interview.candidateName}:\n\n${interview.messages.map((m) => `${m.role === "assistant" ? "Interviewer" : "Candidate"}: ${m.content}`).join("\n\n")}` },
    ];

    const evaluation = await callAI(evalMessages);

    interview.status = "completed";
    interview.completedAt = new Date().toISOString();
    interview.evaluation = evaluation;

    writeDB(DB_FILE, interviews);

    res.json({ evaluation });
  } catch (error) {
    console.error("End interview error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/interviews", (_req, res) => {
  const interviews = readDB(DB_FILE);
  const summary = interviews.map((i) => ({
    id: i.id,
    candidateName: i.candidateName,
    candidateEmail: i.candidateEmail,
    jobRole: i.jobRole,
    status: i.status,
    startedAt: i.startedAt,
    completedAt: i.completedAt,
    messageCount: i.messages.length,
  }));
  res.json(summary);
});

app.get("/api/interviews/:id", (req, res) => {
  const interviews = readDB(DB_FILE);
  const interview = interviews.find((i) => i.id === req.params.id);
  if (!interview) return res.status(404).json({ error: "Interview not found" });
  res.json(interview);
});

app.get("/api/candidates", (_req, res) => {
  res.json(readDB(CANDIDATES_FILE));
});

app.delete("/api/interviews/:id", (req, res) => {
  let interviews = readDB(DB_FILE);
  const idx = interviews.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Interview not found" });
  interviews.splice(idx, 1);
  writeDB(DB_FILE, interviews);
  res.json({ success: true });
});

ensureStorage();

app.listen(PORT, () => {
  console.log(`AI Interview Pilot running at http://localhost:${PORT}`);
});
