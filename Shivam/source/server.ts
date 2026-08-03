import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Initialize Gemini Client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({ apiKey });
};

// API Endpoint 1: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Endpoint 2: AI Spatial & Model Advisor
app.post("/api/ai/spatial-advisor", async (req, res) => {
  try {
    const { prompt, modelCategory, currentRoomType, imageBase64 } = req.body;

    const ai = getGeminiClient();
    const systemInstruction = `You are an expert AR (Augmented Reality) Spatial Architect and Interior/Product Designer. 
Your goal is to give precise, practical, and visually inspiring advice on placing 3D models in physical spaces (WebAR).
Format your response as valid JSON with the following structure:
{
  "recommendations": [
    {
      "title": "Short title",
      "category": "Furniture | Art | Tech | Nature | Vehicle | Sci-Fi",
      "suggestedScale": { "x": 1.0, "y": 1.0, "z": 1.0 },
      "placementTips": "Where to place this model for best real-world AR perspective and lighting",
      "lightingSuggestion": "Warm ambient / Cool studio / Directional spotlight",
      "idealDimensionsCm": { "width": 80, "height": 75, "depth": 85 }
    }
  ],
  "spatialAdvice": "Detailed design and AR scaling/placement guidance based on user input",
  "recommendedColorPalette": ["#hex1", "#hex2", "#hex3", "#hex4"]
}`;

    let contents: any[] = [];

    if (imageBase64) {
      // Remove data URI header if present
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      contents.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: cleanBase64,
        },
      });
      contents.push(
        `Analyze this photo of the real physical environment. User wants to place 3D models in category: "${modelCategory || "All"}". User query: "${prompt || "Analyze space for AR 3D model placement"}". Provide spatial placement and color advice.`
      );
    } else {
      contents.push(
        `User query: "${prompt}". Preferred Room/Environment: "${currentRoomType || "Living Room"}". Preferred Category: "${modelCategory || "General"}". Provide AR 3D model placement suggestions and spatial advice.`
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from Gemini");
    }

    const data = JSON.parse(text);
    return res.json({ success: true, data });
  } catch (err: any) {
    console.error("Error in /api/ai/spatial-advisor:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to generate spatial advice.",
    });
  }
});

// API Endpoint 3: AI Custom Material & Theme Generator
app.post("/api/ai/material-stylist", async (req, res) => {
  try {
    const { modelName, themePrompt } = req.body;
    const ai = getGeminiClient();

    const systemInstruction = `You are a 3D Material & Shading Stylist for WebGL and AR. 
Given a 3D model name and a creative style theme (e.g., "Cyberpunk Neon", "Minimalist Scandinavian", "Aged Copper Rust", "Futuristic Chrome Marble"), generate shader/material properties for WebGL rendering.
Output JSON format:
{
  "themeTitle": "Style Name",
  "description": "Short explanation of style aesthetic",
  "baseColor": "#hexColor",
  "roughness": 0.2, // number between 0.0 and 1.0
  "metalness": 0.8, // number between 0.0 and 1.0
  "emissiveColor": "#hexColor",
  "emissiveIntensity": 0.5,
  "wireframe": false,
  "arShadowOpacity": 0.6
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate material style for model "${modelName || "Chair"}" with theme prompt: "${themePrompt || "Modern Minimalist"}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text;
    const data = JSON.parse(text || "{}");
    return res.json({ success: true, data });
  } catch (err: any) {
    console.error("Error in /api/ai/material-stylist:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to generate material styling.",
    });
  }
});

// API Endpoint 4: AI Professor Circuit Command Interpreter
app.post("/api/ai/circuit-command", async (req, res) => {
  try {
    const { prompt, circuitState } = req.body;
    const ai = getGeminiClient();

    const systemInstruction = `You are the AI Electronics Professor controlling an interactive 3D digital electronics trainer bench.
The user gives commands in natural language to modify or build circuits.
Convert the user request into an array of executable circuit actions and a friendly professor explanation.

Supported Component Meta IDs:
- "ic-7408-and" (7408 Quad 2-Input AND Gate)
- "ic-7400-nand" (7400 Quad 2-Input NAND Gate)
- "ic-7432-or" (7432 Quad 2-Input OR Gate)
- "ic-7404-not" (7404 Hex Inverter / NOT Gate)
- "out-led-red" (Red LED)
- "out-lcd" (16x2 LCD)
- "in-pot" (Potentiometer)
- "in-dip4" (4-Bit DIP Switch)

Trainer Board Base Component ID: "comp-base"
Trainer Board Terminal Pin IDs:
- "tb-vcc5a" (+5V Power)
- "tb-gnd1" (GND Ground)
- "tb-swA" (Switch A OUT)
- "tb-swB" (Switch B OUT)
- "tb-led1" (LED 1 IN)
- "tb-led2" (LED 2 IN)

IC Pin IDs: "pin-1" (Input 1A), "pin-2" (Input 1B), "pin-3" (Output 1Y), "pin-7" (GND), "pin-14" (VCC)

Return strictly JSON with schema:
{
  "explanation": "Friendly professor explanation of what was changed and why.",
  "actions": [
    { "type": "POWER", "value": true },
    { "type": "SWITCH_A", "value": true },
    { "type": "SWITCH_B", "value": false },
    { "type": "ADD_COMPONENT", "metaId": "ic-7408-and" },
    { "type": "REMOVE_COMPONENT", "id": "all" },
    { "type": "CLEAR_WIRES" },
    { "type": "ADD_WIRE", "fromCompId": "comp-base", "fromPinId": "tb-vcc5a", "toCompId": "ic-7408-and", "toPinId": "pin-14", "color": "#ef4444" },
    { "type": "PRESET_EXPERIMENT", "gateType": "AND" }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Current Circuit State: ${JSON.stringify(circuitState || {})}. User Command: "${prompt}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const text = response.text;
    const data = JSON.parse(text || "{}");
    return res.json({ success: true, data });
  } catch (err: any) {
    console.error("Error in /api/ai/circuit-command:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to process circuit command.",
    });
  }
});

// Mount Vite in Dev, or static files in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AR Model World server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
