let currentInterviewId = null;
let isLoading = false;

document.addEventListener("DOMContentLoaded", loadJobs);

function showScreen(name) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(`screen-${name}`).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((b) => {
    if (
      (name === "home" && b.textContent === "Home") ||
      (name === "dashboard" && b.textContent === "Dashboard")
    ) b.classList.add("active");
  });
  if (name === "dashboard") loadDashboard();
}

async function loadJobs() {
  try {
    const res = await fetch("/api/jobs");
    const jobs = await res.json();
    const select = document.getElementById("job-role");
    jobs.forEach((j) => {
      const opt = document.createElement("option");
      opt.value = j.title;
      opt.textContent = j.title;
      select.appendChild(opt);
    });
  } catch (e) {
    console.error("Failed to load jobs:", e);
  }
}

async function startInterview(e) {
  e.preventDefault();
  const name = document.getElementById("candidate-name").value.trim();
  const email = document.getElementById("candidate-email").value.trim();
  const role = document.getElementById("job-role").value;

  if (!name || !email || !role) return;

  document.getElementById("interview-role").textContent = role;
  document.getElementById("interview-candidate").textContent = `${name} - ${email}`;

  showScreen("interview");
  document.getElementById("chat-messages").innerHTML = "";
  showTyping();

  try {
    const res = await fetch("/api/interview/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateName: name, candidateEmail: email, jobRole: role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    currentInterviewId = data.interviewId;
    removeTyping();
    addMessage("assistant", data.firstMessage);
  } catch (err) {
    removeTyping();
    addMessage("assistant", "Error starting interview. Please try again.");
    console.error(err);
  }
}

async function sendMessage() {
  if (isLoading) return;
  const input = document.getElementById("user-input");
  const answer = input.value.trim();
  if (!answer || !currentInterviewId) return;

  addMessage("user", answer);
  input.value = "";
  input.style.height = "auto";
  isLoading = true;
  showTyping();

  try {
    const res = await fetch("/api/interview/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interviewId: currentInterviewId, answer }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    removeTyping();
    addMessage("assistant", data.response);
  } catch (err) {
    removeTyping();
    addMessage("assistant", "Error getting response. Please try again.");
    console.error(err);
  } finally {
    isLoading = false;
  }
}

async function endInterview() {
  if (!currentInterviewId) return;
  if (!confirm("End this interview? You'll receive an evaluation.")) return;

  showScreen("evaluation");
  document.getElementById("evaluation-content").innerHTML = '<div class="loading">Generating evaluation...</div>';

  try {
    const res = await fetch("/api/interview/end", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interviewId: currentInterviewId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    document.getElementById("evaluation-content").textContent = data.evaluation;
    currentInterviewId = null;
  } catch (err) {
    document.getElementById("evaluation-content").textContent = "Error generating evaluation: " + err.message;
  }
}

function addMessage(role, content) {
  const container = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.innerHTML = `
    <div class="message-avatar">${role === "assistant" ? "AI" : "U"}</div>
    <div class="message-bubble">${escapeHtml(content)}</div>
  `;
  container.appendChild(div);
  scrollToBottom();
}

function showTyping() {
  const container = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.id = "typing-indicator";
  div.className = "message assistant";
  div.innerHTML = `
    <div class="message-avatar">AI</div>
    <div class="typing-indicator"><span></span><span></span><span></span></div>
  `;
  container.appendChild(div);
  scrollToBottom();
}

function removeTyping() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

function scrollToBottom() {
  const container = document.getElementById("chat-container");
  container.scrollTop = container.scrollHeight;
}

function handleKeydown(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

async function loadDashboard() {
  const list = document.getElementById("interview-list");
  list.innerHTML = '<div class="loading">Loading...</div>';

  try {
    const res = await fetch("/api/interviews");
    const interviews = await res.json();

    if (interviews.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <h3>No interviews yet</h3>
          <p>Start your first AI interview from the home screen.</p>
        </div>`;
      return;
    }

    list.innerHTML = interviews
      .map(
        (i) => `
      <div class="interview-item">
        <div class="interview-item-info">
          <h3>${escapeHtml(i.candidateName)}</h3>
          <p>${escapeHtml(i.jobRole)} &middot; ${new Date(i.startedAt).toLocaleDateString()} &middot; ${i.messageCount} messages</p>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="status-badge ${i.status}">${i.status.replace("_", " ")}</span>
          ${i.status === "completed" ? `<button class="btn btn-secondary" onclick="viewEvaluation('${i.id}')">View</button>` : ""}
          <button class="btn btn-danger" onclick="deleteInterview('${i.id}')">Delete</button>
        </div>
      </div>`
      )
      .join("");
  } catch (err) {
    list.innerHTML = '<div class="loading">Failed to load interviews.</div>';
  }
}

async function viewEvaluation(id) {
  try {
    const res = await fetch(`/api/interviews/${id}`);
    const interview = await res.json();
    document.getElementById("evaluation-content").textContent = interview.evaluation || "No evaluation available.";
    showScreen("evaluation");
  } catch (err) {
    alert("Failed to load interview.");
  }
}

async function deleteInterview(id) {
  if (!confirm("Delete this interview?")) return;
  try {
    await fetch(`/api/interviews/${id}`, { method: "DELETE" });
    loadDashboard();
  } catch (err) {
    alert("Failed to delete.");
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
