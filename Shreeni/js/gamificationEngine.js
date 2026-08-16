/**
 * Gamification & Quest Engine
 * Manages experiment stages, truth table auto-verification, XP, stars, and achievement badges.
 */
class GamificationEngine {
  constructor() {
    this.currentMode = '4x1_MUX'; // '4x1_MUX' | '8x1_MUX' | 'CHALLENGE' | 'SANDBOX'
    this.xp = 0;
    this.level = 1;
    this.stars = {
      '4x1_MUX': 0,
      '8x1_MUX': 0,
      'CHALLENGE': 0
    };
    this.verifiedRows = new Set();
    this.unlockedBadges = new Set();

    // Achievements Catalog
    this.badges = [
      { id: 'first_chip', title: 'First Silicon', desc: 'Placed your first IC chip on the breadboard', icon: '⚡' },
      { id: 'wire_wizard', title: 'Wire Wizard', desc: 'Connected 10 jumper wires correctly', icon: '🔌' },
      { id: 'mux4_master', title: '4x1 MUX Master', desc: 'Fully verified the 4x1 Multiplexer truth table', icon: '🏆' },
      { id: 'mux8_master', title: '8x1 MUX Master', desc: 'Fully verified the 8x1 Multiplexer truth table', icon: '🎖️' },
      { id: 'boolean_pro', title: 'Boolean Realizer', desc: 'Solved the MUX Boolean Function challenge', icon: '🧠' }
    ];

    // Truth Table Definitions
    this.truthTables = {
      '4x1_MUX': [
        { s1: 0, s0: 0, activeInput: 'I0', label: 'S1=0, S0=0 → Y = I0' },
        { s1: 0, s0: 1, activeInput: 'I1', label: 'S1=0, S0=1 → Y = I1' },
        { s1: 1, s0: 0, activeInput: 'I2', label: 'S1=1, S0=0 → Y = I2' },
        { s1: 1, s0: 1, activeInput: 'I3', label: 'S1=1, S0=1 → Y = I3' }
      ],
      '8x1_MUX': [
        { s2: 0, s1: 0, s0: 0, activeInput: 'I0', label: '000 → Y = I0' },
        { s2: 0, s1: 0, s0: 1, activeInput: 'I1', label: '001 → Y = I1' },
        { s2: 0, s1: 1, s0: 0, activeInput: 'I2', label: '010 → Y = I2' },
        { s2: 0, s1: 1, s0: 1, activeInput: 'I3', label: '011 → Y = I3' },
        { s2: 1, s1: 0, s0: 0, activeInput: 'I4', label: '100 → Y = I4' },
        { s2: 1, s1: 0, s0: 1, activeInput: 'I5', label: '101 → Y = I5' },
        { s2: 1, s1: 1, s0: 0, activeInput: 'I6', label: '110 → Y = I6' },
        { s2: 1, s1: 1, s0: 1, activeInput: 'I7', label: '111 → Y = I7' }
      ]
    };
  }

  setMode(mode) {
    this.currentMode = mode;
    this.verifiedRows.clear();
    this.renderTruthTableUI();
    this.updateQuestSteps();
  }

  addXP(amount) {
    this.xp += amount;
    const oldLevel = this.level;
    this.level = Math.floor(this.xp / 100) + 1;

    // Update Header XP Bar
    const xpBar = document.getElementById('xp-progress');
    const xpText = document.getElementById('xp-text');
    const levelBadge = document.getElementById('level-badge');

    if (xpBar) xpBar.style.width = `${(this.xp % 100)}%`;
    if (xpText) xpText.innerText = `${this.xp} XP`;
    if (levelBadge) levelBadge.innerText = `Lvl ${this.level}`;

    if (this.level > oldLevel && window.soundFx) {
      window.soundFx.playSuccessFanfare();
      this.showNotification(`LEVEL UP! You reached Level ${this.level}! 🎉`);
    }
  }

  unlockBadge(badgeId) {
    if (this.unlockedBadges.has(badgeId)) return;
    this.unlockedBadges.add(badgeId);
    const badge = this.badges.find(b => b.id === badgeId);
    if (badge) {
      this.addXP(50);
      this.showNotification(`BADGE UNLOCKED: ${badge.icon} ${badge.title}!`);
      if (window.soundFx) window.soundFx.playSuccessFanfare();
    }
  }

  showNotification(msg) {
    const popup = document.createElement('div');
    popup.className = 'achievement-toast';
    popup.innerHTML = `<span>${msg}</span>`;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.classList.add('show');
    }, 50);

    setTimeout(() => {
      popup.classList.remove('show');
      setTimeout(() => popup.remove(), 400);
    }, 3500);
  }

  /**
   * Check truth table conditions based on current trainer switch states & simulated LED outputs
   */
  evaluateTruthTable(simulation, bbEngine) {
    if (!simulation || !bbEngine) return;

    if (bbEngine.placedICs.length > 0) {
      this.unlockBadge('first_chip');
    }
    if (bbEngine.wires.length >= 8) {
      this.unlockBadge('wire_wizard');
    }

    if (this.currentMode === '4x1_MUX') {
      this.verify4x1MUX(simulation);
    } else if (this.currentMode === '8x1_MUX') {
      this.verify8x1MUX(simulation);
    } else if (this.currentMode === 'CHALLENGE') {
      this.verifyChallengeMode(simulation);
    }
  }

  verify4x1MUX(sim) {
    const table = this.truthTables['4x1_MUX'];
    const S1 = sim.trainerSwitches.S1;
    const S0 = sim.trainerSwitches.S0;
    const Y = sim.ledOutputs.Y1;

    table.forEach((row, idx) => {
      if (S1 === row.s1 && S0 === row.s0) {
        // Active data input value
        const dataVal = sim.trainerSwitches[row.activeInput];
        // Check if output Y equals data input
        if (Y === dataVal) {
          const rowKey = `4x1_${idx}`;
          if (!this.verifiedRows.has(rowKey)) {
            this.verifiedRows.add(rowKey);
            this.addXP(25);
            if (window.soundFx) window.soundFx.playRowVerified();
            this.updateTruthTableRowUI(idx, true);

            // Check full verification completion
            if (this.verifiedRows.size === table.length) {
              this.stars['4x1_MUX'] = 3;
              this.unlockBadge('mux4_master');
              this.showNotification('🌟 4x1 MUX Truth Table Fully Verified! Excellent Work!');
            }
          }
        }
      }
    });
  }

  verify8x1MUX(sim) {
    const table = this.truthTables['8x1_MUX'];
    const S2 = sim.trainerSwitches.S2;
    const S1 = sim.trainerSwitches.S1;
    const S0 = sim.trainerSwitches.S0;
    const Y = sim.ledOutputs.Y1;
    const W = sim.ledOutputs.Y1_BAR; // Inverted output W

    table.forEach((row, idx) => {
      if (S2 === row.s2 && S1 === row.s1 && S0 === row.s0) {
        const dataVal = sim.trainerSwitches[row.activeInput];
        if (Y === dataVal && W === (1 - dataVal)) {
          const rowKey = `8x1_${idx}`;
          if (!this.verifiedRows.has(rowKey)) {
            this.verifiedRows.add(rowKey);
            this.addXP(30);
            if (window.soundFx) window.soundFx.playRowVerified();
            this.updateTruthTableRowUI(idx, true);

            if (this.verifiedRows.size === table.length) {
              this.stars['8x1_MUX'] = 3;
              this.unlockBadge('mux8_master');
              this.showNotification('🏆 8x1 MUX Truth Table Fully Verified! You are a MUX Master!');
            }
          }
        }
      }
    });
  }

  verifyChallengeMode(sim) {
    // Challenge Goal: Implement Boolean Function F(A,B,C) = sum m(1,3,6,7)
    // Minterms: 1(001), 3(011), 6(110), 7(111) should output 1; others output 0
    const S2 = sim.trainerSwitches.S2;
    const S1 = sim.trainerSwitches.S1;
    const S0 = sim.trainerSwitches.S0;
    const select = (S2 << 2) | (S1 << 1) | S0;
    const expectedOutput = [1, 3, 6, 7].includes(select) ? 1 : 0;
    const Y = sim.ledOutputs.Y1;

    if (Y === expectedOutput) {
      const rowKey = `chal_${select}`;
      if (!this.verifiedRows.has(rowKey)) {
        this.verifiedRows.add(rowKey);
        this.addXP(20);
        this.updateTruthTableRowUI(select, true);

        if (this.verifiedRows.size === 8) {
          this.stars['CHALLENGE'] = 3;
          this.unlockBadge('boolean_pro');
          this.showNotification('🧠 Challenge Solved! Boolean Function F(A,B,C) = ∑ m(1,3,6,7) Successfully Implemented!');
        }
      }
    }
  }

  renderTruthTableUI() {
    const container = document.getElementById('truth-table-body');
    if (!container) return;

    if (this.currentMode === '4x1_MUX') {
      container.innerHTML = `
        <table class="truth-table">
          <thead>
            <tr><th>S1</th><th>S0</th><th>Active Line</th><th>Output Y</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${this.truthTables['4x1_MUX'].map((row, i) => `
              <tr id="tt-row-${i}">
                <td>${row.s1}</td>
                <td>${row.s0}</td>
                <td>${row.activeInput}</td>
                <td>Equal to ${row.activeInput}</td>
                <td class="status-cell"><span class="badge-pending">⌛ Pending</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (this.currentMode === '8x1_MUX') {
      container.innerHTML = `
        <table class="truth-table">
          <thead>
            <tr><th>S2</th><th>S1</th><th>S0</th><th>Input</th><th>Y</th><th>Ȳ (W)</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${this.truthTables['8x1_MUX'].map((row, i) => `
              <tr id="tt-row-${i}">
                <td>${row.s2}</td>
                <td>${row.s1}</td>
                <td>${row.s0}</td>
                <td>${row.activeInput}</td>
                <td>${row.activeInput}</td>
                <td>NOT(${row.activeInput})</td>
                <td class="status-cell"><span class="badge-pending">⌛ Pending</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (this.currentMode === 'CHALLENGE') {
      container.innerHTML = `
        <div class="challenge-banner">
          🎯 <strong>Goal</strong>: Implement $F(A,B,C) = \\sum m(1,3,6,7)$ using 8x1 MUX.
          <br/><small>Connect D1, D3, D6, D7 to +5V (VCC) and D0, D2, D4, D5 to GND!</small>
        </div>
        <table class="truth-table">
          <thead>
            <tr><th>C(S2)</th><th>B(S1)</th><th>A(S0)</th><th>Target F</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${[0,1,2,3,4,5,6,7].map(i => {
              const c = (i >> 2) & 1, b = (i >> 1) & 1, a = i & 1;
              const exp = [1,3,6,7].includes(i) ? 1 : 0;
              return `
                <tr id="tt-row-${i}">
                  <td>${c}</td><td>${b}</td><td>${a}</td>
                  <td><strong>${exp}</strong></td>
                  <td class="status-cell"><span class="badge-pending">⌛ Pending</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;
    } else {
      container.innerHTML = `<p class="sandbox-desc">🛠️ <strong>Sandbox Mode</strong>: Build any digital logic circuit freely. Drag chips, route wires, and test with trainer switches!</p>`;
    }
  }

  updateTruthTableRowUI(index, verified) {
    const row = document.getElementById(`tt-row-${index}`);
    if (row && verified) {
      const cell = row.querySelector('.status-cell');
      if (cell) {
        cell.innerHTML = `<span class="badge-verified">✅ Verified</span>`;
        row.classList.add('row-verified');
      }
    }
  }

  updateQuestSteps() {
    const guideEl = document.getElementById('quest-guide-steps');
    if (!guideEl) return;

    if (this.currentMode === '4x1_MUX') {
      guideEl.innerHTML = `
        <ol class="step-list">
          <li>Place <strong>74153 IC</strong> on breadboard DIP slot.</li>
          <li>Wire <strong>Pin 16 (VCC)</strong> to +5V Rail and <strong>Pin 8 (GND)</strong> to GND.</li>
          <li>Wire <strong>Pin 1 (1Ḡ Strobe)</strong> to GND (Active LOW).</li>
          <li>Connect Select inputs: <strong>Pin 14 (A)</strong> → Switch S0, <strong>Pin 2 (B)</strong> → Switch S1.</li>
          <li>Connect Data inputs: <strong>Pins 6, 5, 4, 3</strong> (1I0-1I3) → Switches I0, I1, I2, I3.</li>
          <li>Connect Output: <strong>Pin 7 (1Y)</strong> → LED Y.</li>
          <li>Toggle Switches S1, S0 to verify all 4 input selection states!</li>
        </ol>
      `;
    } else if (this.currentMode === '8x1_MUX') {
      guideEl.innerHTML = `
        <ol class="step-list">
          <li>Place <strong>74151 IC</strong> on breadboard DIP slot.</li>
          <li>Wire <strong>Pin 16 (VCC)</strong> to +5V, <strong>Pin 8 (GND)</strong> & <strong>Pin 7 (Ē Enable)</strong> to GND.</li>
          <li>Connect Select lines: <strong>Pin 15 (A)</strong> → S0, <strong>Pin 14 (B)</strong> → S1, <strong>Pin 13 (C)</strong> → S2.</li>
          <li>Connect Data inputs: <strong>Pins 4, 3, 2, 1, 12, 11, 10, 9</strong> (D0-D7) → Switches I0 to I7.</li>
          <li>Connect Outputs: <strong>Pin 5 (Y)</strong> → LED Y, <strong>Pin 6 (W)</strong> → LED Ȳ.</li>
          <li>Verify all 8 select combinations (000 to 111)!</li>
        </ol>
      `;
    } else if (this.currentMode === 'CHALLENGE') {
      guideEl.innerHTML = `
        <ol class="step-list">
          <li>Place <strong>74151 8x1 MUX IC</strong>.</li>
          <li>Connect Data Inputs for minterms 1, 3, 6, 7 (D1, D3, D6, D7) to <strong>+5V (VCC)</strong>.</li>
          <li>Connect remaining Data Inputs (D0, D2, D4, D5) to <strong>GND</strong>.</li>
          <li>Wire Select lines C, B, A to Switches S2, S1, S0.</li>
          <li>Wire Output Pin 5 (Y) to LED Y.</li>
        </ol>
      `;
    } else {
      guideEl.innerHTML = `<p>Freeplay lab mode. Select any IC from toolbox, connect wires, and test logic functionality!</p>`;
    }
  }
}

window.GamificationEngine = GamificationEngine;
