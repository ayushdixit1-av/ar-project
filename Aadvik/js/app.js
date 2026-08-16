/**
 * Main Application Orchestrator for AR Digital Logic Lab
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Instantiate Core Engine Modules
    window.appCircuit = new LogicCircuitEngine();
    window.app3D = new Lab3DScene('three-canvas');
    window.appAR = new ARController(window.app3D);

    // Wire tracing state
    window.wireTracing = false;

    // Initial Sync
    syncState();
});

/**
 * Switch between Half Adder and Full Adder Lab Modes
 */
function switchLabMode(mode) {
    window.appCircuit.setMode(mode);

    // Update UI Mode Buttons
    document.getElementById('btn-mode-half').classList.toggle('active', mode === 'half');
    document.getElementById('btn-mode-full').classList.toggle('active', mode === 'full');

    // Show/Hide Cin input controls
    const cinContainer = document.getElementById('cin-container');
    cinContainer.style.display = mode === 'full' ? 'flex' : 'none';

    // Show/Hide Lab Manual Sections
    document.getElementById('section-half-adder').style.display = mode === 'half' ? 'block' : 'none';
    document.getElementById('section-full-adder').style.display = mode === 'full' ? 'block' : 'none';

    // Update Equations & Titles
    if (mode === 'half') {
        document.getElementById('eq-sum').innerText = 'S = A ⊕ B';
        document.getElementById('eq-carry').innerText = 'C = A · B';
    } else {
        document.getElementById('eq-sum').innerText = 'S = Cin ⊕ (A ⊕ B)';
        document.getElementById('eq-carry').innerText = 'C = Cin(A ⊕ B) + AB';
    }

    syncState();
}

/**
 * Toggle Input Switches A, B, Cin
 */
function toggleInput(key) {
    window.appCircuit.toggleInput(key);
    syncState();
}

/**
 * Directly set input values from Truth Table row click
 */
function applyTruthTableRow(mode, a, b, cin = 0) {
    if (window.appCircuit.mode !== mode) {
        switchLabMode(mode);
    }
    window.appCircuit.setInput('A', a);
    window.appCircuit.setInput('B', b);
    window.appCircuit.setInput('Cin', cin);

    syncState();

    // Trigger celebration confetti on interactive truth table verification!
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.8 }
        });
    }
}

/**
 * Toggle Main Power Supply (+5V)
 */
function togglePower() {
    const btn = document.getElementById('btn-power');
    const isPowerOn = !window.appCircuit.power;
    window.appCircuit.setPower(isPowerOn);

    if (isPowerOn) {
        btn.classList.remove('off');
        document.getElementById('power-status-tag').innerText = '5V ON';
    } else {
        btn.classList.add('off');
        document.getElementById('power-status-tag').innerText = 'POWER OFF';
    }

    syncState();
}

/**
 * Reset Circuit to default 0 state
 */
function resetCircuit() {
    window.appCircuit.setInput('A', 0);
    window.appCircuit.setInput('B', 0);
    window.appCircuit.setInput('Cin', 0);
    syncState();
}

/**
 * Toggle Signal Flow Highlighting / Wire Tracing
 */
function toggleWireTracing() {
    window.wireTracing = !window.wireTracing;
    document.getElementById('btn-trace').classList.toggle('active', window.wireTracing);
    syncState();
}

/**
 * Synchronize UI HUD, 3D Breadboard, LEDs, Wires, and Truth Table rows
 */
function syncState() {
    const inputs = window.appCircuit.inputs;
    const outputs = window.appCircuit.outputs;
    const isPowerOn = window.appCircuit.power;
    const mode = window.appCircuit.mode;

    // 1. Update HUD Switches UI
    ['A', 'B', 'Cin'].forEach(key => {
        const sw = document.getElementById(`switch-${key}`);
        if (sw) {
            const handle = sw.querySelector('.switch-handle');
            const val = inputs[key];
            sw.classList.toggle('on', val === 1);
            handle.innerText = val;
        }
        // Update 3D switch lever position
        window.app3D.setSwitchState(key, inputs[key] === 1);
    });

    // 2. Update Output Values & Glowing LEDs matching Image 1
    const sumActive = isPowerOn && outputs.sum === 1;
    const carryActive = isPowerOn && outputs.carry === 1;

    document.getElementById('val-sum').innerText = sumActive ? '1 (HIGH - 5V)' : '0 (LOW - 0V)';
    document.getElementById('val-carry').innerText = carryActive ? '1 (HIGH - 5V)' : '0 (LOW - 0V)';

    // Update HUD LED glow indicators
    document.getElementById('hud-led-sum').classList.toggle('active', sumActive);
    document.getElementById('hud-led-carry').classList.toggle('active', carryActive);

    // Update 3D LEDs & Light Emission
    window.app3D.setLEDState('sum', sumActive);
    window.app3D.setLEDState('carry', carryActive);

    // 3. Update Wires in 3D scene
    window.app3D.updateWires(mode, window.appCircuit.pinStates, window.wireTracing);

    // 4. Highlight Active Truth Table Row in PSIT Lab Sheet
    highlightTruthTableRow();
}

/**
 * Highlight active row in lab paper truth table
 */
function highlightTruthTableRow() {
    const mode = window.appCircuit.mode;
    const inputs = window.appCircuit.inputs;

    if (mode === 'half') {
        // Clear all rows
        document.querySelectorAll('#tt-half-table tr').forEach(r => r.classList.remove('active-row'));
        const rowId = `row-half-${inputs.A}${inputs.B}`;
        const targetRow = document.getElementById(rowId);
        if (targetRow) targetRow.classList.add('active-row');
    } else {
        document.querySelectorAll('#tt-full-table tr').forEach(r => r.classList.remove('active-row'));
        const rowId = `row-full-${inputs.A}${inputs.B}${inputs.Cin}`;
        const targetRow = document.getElementById(rowId);
        if (targetRow) targetRow.classList.add('active-row');
    }
}

/**
 * Toggle Lab Manual Drawer Side Panel
 */
function toggleManualDrawer() {
    const drawer = document.getElementById('lab-manual-drawer');
    const icon = document.getElementById('drawer-toggle-icon');
    const btn = document.getElementById('btn-view-manual');

    drawer.classList.toggle('closed');

    if (drawer.classList.contains('closed')) {
        icon.className = 'fa-solid fa-chevron-left';
        btn.classList.remove('active');
    } else {
        icon.className = 'fa-solid fa-chevron-right';
        btn.classList.add('active');
    }

    // Trigger canvas resize update
    setTimeout(() => {
        window.app3D.onWindowResize();
    }, 300);
}

/**
 * Toggle AR Mode
 */
function toggleARMode() {
    window.appAR.toggleARMode();
}

function adjustARScale(factor) {
    window.appAR.adjustScale(factor);
}

function resetARPos() {
    window.appAR.recenterModel();
}

function setCameraPreset(preset) {
    window.app3D.setCameraPreset(preset);
}

/**
 * Print / Export PSIT Lab Manual Sheet
 */
function printLabSheet() {
    window.print();
}
