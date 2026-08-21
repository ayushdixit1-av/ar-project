# 🕶️ AR LAB IIT KANPUR — Digital Electronics & AR Experiments

Welcome to the **AR Project** repository! This repository contains WebGL & WebXR Augmented Reality experiments, interactive solderless breadboard simulators, and 3D digital electronics lab components.

🌐 **Live Demo (AR Lab)**: [https://ayushdixit1-av.github.io/ar-project/Ayush/](https://ayushdixit1-av.github.io/ar-project/Ayush/)

---

## 🗺️ Project Architecture Overview

```mermaid
graph TD
    ROOT["AR Project Repository"]

    subgraph LABS ["Contributor Modules & Labs"]
        AYUSH["Ayush — 3D AR Breadboard & Hole Engine"]
        AADVIK["Aadvik"]
        AMAR["Amar"]
        DEVANSHI["Devanshi"]
        SHIVAM["Shivam"]
        SHREENI["Shreeni"]
        SHREYA["Shreya"]
    end

    ROOT --> AYUSH
    ROOT --> AADVIK
    ROOT --> AMAR
    ROOT --> DEVANSHI
    ROOT --> SHIVAM
    ROOT --> SHREENI
    ROOT --> SHREYA

    subgraph FEATURES ["Ayush Lab Core Features"]
        BB["Solderless Breadboard Engine"]
        AR["WebXR Augmented Reality Mode"]
        ICS["7400-Series DIP IC Logic Gates"]
        WIRES["Bezier Jumper Wires"]
        LEDS["5mm Color LEDs"]
        PS["5V Power Supply Harness"]
    end

    AYUSH --> FEATURES
```

---

## 📁 Repository Structure

| Folder | Module / Feature Description |
| :--- | :--- |
| **`Ayush/`** | 3D Interactive Breadboard Simulator with WebXR AR support (`✨ View in AR`), IC placement, wire routing, LED components, and power supply management. |
| **`Amey/`** | Active Contributor |
| **`Aadvik/`** | Experimental AR modules & lab resources. |
| **`Devanshi/`** | Contributor module. |
| **`Shivam/`** | Contributor module. |
| **`Shreeni/`** | Contributor module. |
| **`Shreya/`** | Contributor module. |

---

## ⚡ Getting Started (AR Lab)

To run the AR Digital Electronics Lab (IIT-K) locally:

```bash
cd Ayush
node serve.js
```
Then open `http://localhost:8080` in your web browser.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
