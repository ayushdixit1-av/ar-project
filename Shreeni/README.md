# ⚡ Gamified Digital Logic MUX Lab (Shreeni Module)

Welcome to **Shreeni's Gamified Digital Logic MUX Lab**, an interactive, high-performance web application designed for implementing and verifying the truth tables of **4x1** and **8x1 Multiplexers (MUX)**.

---

## 🎯 Experiments Covered

1. **4x1 Multiplexer Verification**:
   - Implementation using **74153 IC** (Dual 4-to-1 Multiplexer).
   - Selection control via Select inputs $S_1 (B)$ and $S_0 (A)$.
   - Active-LOW Strobe / Enable control ($1\bar{G}$).
   - Real-time auto-verification of output $1Y = 1I_{S_1S_0}$.

2. **8x1 Multiplexer Verification**:
   - Implementation using **74151 IC** (8-to-1 Multiplexer).
   - 3-bit Select lines $S_2 (C), S_1 (B), S_0 (A)$.
   - Active-LOW Strobe / Enable control ($\bar{E}$).
   - Dual complementary outputs $Y$ (non-inverted) and $W = \bar{Y}$ (inverted).

3. **Boolean Function Realization Challenge**:
   - Realizing $F(A,B,C) = \sum m(1,3,6,7)$ using 8x1 MUX.

4. **Sandbox Lab Mode**:
   - Freeplay workbench with all 74-series logic chips (74153, 74151, 7404, 7408, 7432), color-coded Bezier wires, logic probe tool, and trainer kit switches.

---

## 🚀 Features

- 🎮 **Gamification System**: XP rewards, Level progression, Star ratings, Row verification chimes, and Achievement badges ("First Silicon", "Wire Wizard", "4x1 MUX Master", "8x1 MUX Master", "Boolean Realizer").
- 🔌 **Interactive Digital Logic Trainer**: Integrated +5V VCC, GND power supply, 8 Data Switches ($I_0-I_7$), 3 Select Switches ($S_0-S_2$), Strobe switch ($\bar{E}$), Clock pulse generator, and Output LED Indicators.
- 🧰 **Virtual Solderless Breadboard**: 60-column terminal grid with DIP slot channel and continuous top/bottom power bus rails.
- 📐 **Bezier Jumper Wire Engine**: Interactive wire placement with live signal voltage glow (emerald green for High '1', dark line for Low '0'), wire deletion on right-click, and color palette.
- 🔊 **Synthesized Web Audio API FX**: Interactive sound feedback for switch toggles, wire routing, level-up fanfares, and truth table verifications.
- ⚡ **Auto-Wire Preset**: Instant 1-click experiment wiring setup for rapid testing and visual demonstration.

---

## 🛠️ How to Run Locally

You can run the module directly by opening `index.html` in any modern web browser or serving it with Node:

```bash
cd Shreeni
npx serve .
```
Or view the live demo within the repository structure!
