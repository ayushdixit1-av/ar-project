# Binary ⇄ Gray Code Converter (IC 7486 Simulation)
### Virtual / AR Electronics Lab Experiment

An interactive, electrically accurate 3D web application simulating a **4-Bit Binary to Gray Code and Gray to Binary Code Converter** using **IC 7486 (Quad 2-Input Exclusive-OR Gate)** on a realistic breadboard.

---

## 🔬 Circuit Logic & Engineering Principles

### 1. Binary to Gray Code Conversion ($B_3 B_2 B_1 B_0 \to G_3 G_2 G_1 G_0$)
- $G_3 = B_3$ (Direct MSB pass-through buffer; no logic gate required)
- $G_2 = B_3 \oplus B_2$ (Gate 1: Pins 1 & 2 $\to$ Pin 3)
- $G_1 = B_2 \oplus B_1$ (Gate 2: Pins 4 & 5 $\to$ Pin 6)
- $G_0 = B_1 \oplus B_0$ (Gate 3: Pins 8 & 9 $\to$ Pin 10)
- Gate 4 (Pins 11, 12, 13) remains idle / unconnected.

### 2. Gray to Binary Code Conversion ($G_3 G_2 G_1 G_0 \to B_3 B_2 B_1 B_0$)
- $B_3 = G_3$ (Direct MSB pass-through)
- $B_2 = B_3 \oplus G_2$ (Gate 1: Pins 1 & 2 $\to$ Pin 3)
- $B_1 = B_2 \oplus G_1$ (Gate 2: Cascades computed output $B_2$ from Pin 3 into Pin 4)
- $B_0 = B_1 \oplus G_0$ (Gate 3: Cascades computed output $B_1$ from Pin 6 into Pin 8)
- Gate 4 remains idle.

---

## ⚡ IC 7486 14-Pin DIP Pinout Reference

| Pin # | Name | Logic Function in Converter |
|---|---|---|
| **1, 2** | `1A, 1B` | Gate 1 XOR Inputs |
| **3** | `1Y` | Gate 1 XOR Output (Bit 2) |
| **4, 5** | `2A, 2B` | Gate 2 XOR Inputs |
| **6** | `2Y` | Gate 2 XOR Output (Bit 1) |
| **7** | `GND` | Ground Reference (0.0V) |
| **8, 9** | `3A, 3B` | Gate 3 XOR Inputs |
| **10** | `3Y` | Gate 3 XOR Output (Bit 0 LSB) |
| **11, 12, 13** | `4A, 4B, 4Y` | Gate 4 (Unused / Tied Low) |
| **14** | `VCC` | Power Supply (+5.0V DC) |

---

## 🚀 Features & Controls

1. **Augmented Reality (AR) Table Passthrough Mode**:
   - Tap **"AR Mode"** (or press key `A`) to stream your device's camera behind the 3D circuit.
   - Places the virtual breadboard onto your physical table/desk with realistic contact shadow projection (`THREE.ShadowMaterial`).
   - Custom AR controls: Scale slider (0.3x to 1.8x), Rotation slider (0° to 360°), front/rear camera switcher, high-res AR photo snapshot button, and live interactive bit toggle HUD.
2. **3D Virtual Breadboard with Three.js**:
   - Realistic off-white breadboard casing with terminal holes, power rails ($+5\text{V}$, $\text{GND}$), and DIP trough.
   - IC 7486 with laser-etched markings and metallic pins.
   - 4 tactile toggle switches with tilt animations.
   - 4 diffused output LEDs with point-light emissive halos.
   - Live signal current pulse animation on logic HIGH wires.
   - Orbit controls (Left Click Drag: Rotate, Right Click: Pan, Scroll: Zoom).
2. **Interactive Controls & Auto Clock**:
   - 4 large tactile switches with instant state changes.
   - Auto-sequencer clock ticker (cycles 0..15 automatically to visualize rotary encoder transitions).
   - Step $+1$ and Step $-1$ buttons.
3. **16-State Truth Table**:
   - Full 16 combinations with real-time active row highlighting.
   - Demonstrates the **Unit Distance Property** ($\Delta \text{Bits} = 1$).
   - Click any row to immediately set the circuit inputs.
4. **2D Gate-Level Schematic**:
   - Live voltage color indicators (Green = 5V HIGH, Slate = 0V LOW).
5. **Interactive Pin & Wire Inspector**:
   - Hover over or click any IC pin or jumper wire in 3D to see voltage, logic level, and equations.
6. **Virtual Lab Quiz**:
   - 5-question lab assessment with instant grading and celebratory feedback.
7. **Keyboard Shortcuts**:
   - `3`, `2`, `1`, `0`: Toggle respective input bits.
   - `A`: Toggle Augmented Reality Mode.
   - `Space`: Start/Stop auto clock ticker.
   - `M`: Switch Conversion Mode (Binary $\leftrightarrow$ Gray).
   - `R`: Reset inputs to $0000_2$.

---

## 🌐 Deploy to GitHub Pages

This project includes configuration for 1-click automatic deployment to GitHub Pages via **GitHub Actions**.

### Option A: Automatic Deployment (Recommended)
1. Push this repository to your GitHub account (e.g., `main` or `master` branch).
2. On GitHub, go to your repository's **Settings** tab.
3. In the left sidebar, click **Pages** (under *Code and automation*).
4. Under **Build and deployment** $\to$ **Source**, select **GitHub Actions**.
5. The workflow in `.github/workflows/deploy.yml` will automatically build the React app and deploy it live to `https://<your-username>.github.io/<repo-name>/`.

### Option B: Manual CLI Deployment via `gh-pages`
You can also deploy manually with one command:
```bash
npm run deploy
```
*(This automatically runs `npm run build` and publishes the compiled `./dist` folder to the `gh-pages` branch).*
