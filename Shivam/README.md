# Digital Logic Design Laboratory Trainer

An interactive 3D Digital Electronics Laboratory Trainer for logic design experiments, built with React, Three.js, and TypeScript. It features realistic 74xx-series IC models, an internal X-Ray silicon die view, real-time Boolean logic simulation, virtual multimeter probes, automatic truth table verification, and an AI Professor for guided diagnosis.

## Features

- 🎛️ Realistic 3D digital logic trainer kit rendered in the browser
- 🔬 Internal IC X-Ray view to inspect silicon die layout
- ⚡ Real-time Boolean logic simulation engine
- 📊 Multimeter overlay for live probing of circuit nodes
- ✅ Automatic truth table verification for experiments
- 🤖 AI Professor drawer for guided help and diagnosis (powered by the Gemini API)
- 📱 AR mode and mobile sync support

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Three.js for 3D rendering
- Tailwind CSS
- Express (server for API routes)
- Google Gemini API (`@google/genai`)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A [Gemini API key](https://aistudio.google.com/apikey) (only needed for the AI Professor feature)

## Running Locally

1. **Clone the repo and install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy the example env file and add your Gemini API key:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set:

   ```
   GEMINI_API_KEY="your_actual_api_key_here"
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Building for Production

```bash
npm run build
npm start
```

This builds the client with Vite and bundles the Express server into `dist/server.cjs`, then runs it.

## Available Scripts

| Script            | Description                                      |
|-------------------|---------------------------------------------------|
| `npm run dev`     | Start the local development server                |
| `npm run build`   | Build the client and server for production         |
| `npm start`       | Run the production build                            |
| `npm run preview` | Preview the production build locally                |
| `npm run clean`   | Remove build output                                  |
| `npm run lint`    | Type-check the project with `tsc`                    |

## Project Structure

```
src/
├── components/     # React UI components (viewport, sidebars, modals, overlays)
├── data/           # Static data: component library, quizzes, tutorials
├── utils/          # Logic engine, audio synth, Three.js helpers
├── App.tsx         # Root application component
└── main.tsx        # Application entry point
server.ts           # Express server / API routes
```

## Author

Shivam Chauhan
