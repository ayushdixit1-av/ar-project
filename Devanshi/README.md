# 🔬 3D Virtual Breadboard & AR Logic Lab
### 4-Bit Binary ⇄ Gray Code Converter (IC 7486 Digital Logic Simulator)

An interactive, electrically accurate 3D web application simulating a **4-Bit Binary-to-Gray Code and Gray-to-Binary Code Converter** using **IC 7486 (Quad 2-Input Exclusive-OR Gate)** on a realistic breadboard with Augmented Reality (AR) camera passthrough.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser at http://localhost:3000
```

---

## 📦 How to Push to GitHub

To push this codebase to a new repository on your GitHub account:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all project files
git add .

# 3. Commit your changes
git commit -m "feat: 3D Breadboard Binary to Gray Code Converter with AR support"

# 4. Link your remote GitHub repository
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push to GitHub
git push -u origin main
```

---

## 🌐 Automatic Deployment via GitHub Pages

This project is pre-configured with **GitHub Actions** (`.github/workflows/deploy.yml`) to automatically build and deploy your site on every push to `main` or `master`.

### Enabling GitHub Pages on your repository:
1. Go to your repository on **GitHub**.
2. Navigate to **Settings** $\to$ **Pages** (under *Code and automation*).
3. Under **Build and deployment** $\to$ **Source**, select **GitHub Actions**.
4. Push a commit or run the workflow from the **Actions** tab.
5. Your application will be live at: `https://<your-username>.github.io/<your-repo-name>/`!

### Alternative: Deploy to Vercel or Netlify
- **Vercel**: Import the GitHub repo into [Vercel](https://vercel.com). Framework preset: `Vite`, Build command: `npm run build`, Output directory: `dist`.
- **Netlify**: Connect the GitHub repo to [Netlify](https://netlify.com). Publish directory: `dist`.

---

## 🔬 Circuit Logic & Engineering Principles

### 1. Binary to Gray Code Conversion ($B_3 B_2 B_1 B_0 \to G_3 G_2 G_1 G_0$)
- $G_3 = B_3$ (Direct MSB pass-through buffer; no logic gate required)
- $G_2 = B_3 \oplus B_2$ (Gate 1: Pins 1 & 2 $\to$ Pin 3)
- $G_1 = B_2 \oplus B_1$ (Gate 2: Pins 4 & 5 $\to$ Pin 6)
- $G_0 = B_1 \oplus B_0$ (Gate 3: Pins 8 & 9 $\to$ Pin 10)
- Gate 4 (Pins 11, 12, 13) remains idle.

### 2. Gray to Binary Code Conversion ($G_3 G_2 G_1 G_0 \to B_3 B_2 B_1 B_0$)
- $B_3 = G_3$ (Direct MSB pass-through)
- $B_2 = B_3 \oplus G_2$ (Gate 1: Pins 1 & 2 $\to$ Pin 3)
- $B_1 = B_2 \oplus G_1$ (Gate 2: Cascades computed output $B_2$ from Pin 3 into Pin 4)
- $B_0 = B_1 \oplus G_0$ (Gate 3: Cascades computed output $B_1$ from Pin 6 into Pin 8)
- Gate 4 remains idle.

---

## ⚡ IC 7486 Pinout Reference (DIP-14)

| Pin # | Name | Logic Function in Converter |
|---|---|---|
| **1, 2** | `1A, 1B` | Gate 1 XOR Inputs |
| **3** | `1Y` | Gate 1 XOR Output (Bit 2) |
| **4, 5** | `2A, 2B` | Gate 2 XOR Inputs |
| **6** | `2Y` | Gate 2 XOR Output (Bit 1) |
| **7** | `GND` | Ground Reference (0.0V) |
| **8, 9** | `3A, 3B` | Gate 3 XOR Inputs |
| **10** | `3Y` | Gate 3 XOR Output (Bit 0 LSB) |
| **11, 12, 13** | `4A, 4B, 4Y` | Gate 4 (Idle / Unconnected) |
| **14** | `VCC` | Power Supply (+5.0V DC) |

---

## ✨ Key Features

1. **Photorealistic 3D Breadboard (Three.js)**:
   - DIP-14 IC socket with laser-etched lettering.
   - SPST tactile switches with physical lever animations and ON/OFF indicator dots.
   - 5mm diffused output LEDs with point-light glow halos and customizable colors.
   - Current pulse animation along active logic HIGH jumper wires.
2. **Augmented Reality (AR) Table Mode**:
   - Device camera passthrough to project the circuit directly onto your physical desk.
   - Custom scale, rotation, snapshot capture, and interactive bit HUD.
3. **Interactive Component Management**:
   - Click any component (IC, switch, LED, resistor, wire) on the 3D board to open the contextual action card.
   - Full mount, move, customize, and delete capabilities for all components.
   - Hole-restricted wiring mode with real-time connection preview and cancellation banner.
4. **Live Analysis Tools**:
   - Multi-channel Logic Analyzer & Timing Diagram with clock transitions.
   - 16-state interactive Truth Table with unit distance ($\Delta = 1$) highlighting.
   - 2D Gate Schematic with color-coded logic levels (5V HIGH / 0V LOW).
5. **Interactive Quiz**:
   - 5-question digital logic assessment with automatic grading and confetti celebration.

---

## 🛠️ Tech Stack

- **React 19** & **TypeScript**
- **Three.js** for 3D graphics & WebGL rendering
- **Tailwind CSS v4** for UI layout and styling
- **Lucide React** for icons
- **Canvas-Confetti** for quiz celebrations
- **Vite** for rapid bundling and static export
