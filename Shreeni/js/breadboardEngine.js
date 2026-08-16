/**
 * Interactive Solderless Breadboard & Canvas Wire Renderer Engine
 * Features: High-DPI Canvas scaling, Drag & Drop IC placement, Click/Drag Jumper Wiring,
 * Column connection visualizer, Voltage Probe tool, and Audio feedback.
 */
class BreadboardEngine {
  constructor(canvasId, containerId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.container = document.getElementById(containerId);
    this.dpr = window.devicePixelRatio || 1;

    this.cols = 60; // 60 columns on standard breadboard

    // Interactive States
    this.selectedColor = '#ef4444'; // Red default wire color
    this.activeWireStart = null;    // { type, id, pin, x, y, label }
    this.isDraggingWire = false;    // Mouse press & drag state
    this.hoverTarget = null;        // Socket under cursor
    this.hoverWire = null;          // Wire under cursor
    this.wires = [];                // Array of wire objects
    this.placedICs = [];            // Array of placed IC objects

    // IC Drag Placement State
    this.draggedICType = null;      // '74153' | '74151' etc when dragging from drawer

    // Logic Probe State
    this.probeActive = false;
    this.probePosition = null;
    this.probeVoltage = null;

    // Component IC Specifications
    this.icSpecs = {
      '74153': {
        name: '74153',
        desc: 'Dual 4-to-1 Multiplexer',
        pins: 16,
        color: '#1e293b',
        pinLabels: [
          '1Ḡ', 'B(S1)', '1I3', '1I2', '1I1', '1I0', '1Y', 'GND',
          '2Y', '2I0', '2I1', '2I2', '2I3', 'A(S0)', '2Ḡ', 'VCC'
        ]
      },
      '74151': {
        name: '74151',
        desc: '8-to-1 Multiplexer',
        pins: 16,
        color: '#1e293b',
        pinLabels: [
          'D3', 'D2', 'D1', 'D0', 'Y', 'W(Ȳ)', 'Ē', 'GND',
          'D7', 'D6', 'D5', 'D4', 'C(S2)', 'B(S1)', 'A(S0)', 'VCC'
        ]
      },
      '7404': {
        name: '7404',
        desc: 'Hex Inverter (NOT)',
        pins: 14,
        color: '#1e293b',
        pinLabels: [
          '1A', '1Y', '2A', '2Y', '3A', '3Y', 'GND',
          '4Y', '4A', '5Y', '5A', '6Y', '6A', 'VCC'
        ]
      },
      '7408': {
        name: '7408',
        desc: 'Quad 2-Input AND Gate',
        pins: 14,
        color: '#1e293b',
        pinLabels: [
          '1A', '1B', '1Y', '2A', '2B', '2Y', 'GND',
          '4Y', '4B', '4A', '3Y', '3B', '3A', 'VCC'
        ]
      },
      '7432': {
        name: '7432',
        desc: 'Quad 2-Input OR Gate',
        pins: 14,
        color: '#1e293b',
        pinLabels: [
          '1A', '1B', '1Y', '2A', '2B', '2Y', 'GND',
          '4Y', '4B', '4A', '3Y', '3B', '3A', 'VCC'
        ]
      }
    };

    this.socketTargets = []; // Snap targets list
    this.mousePos = { x: 0, y: 0 };

    this.initEvents();
  }

  setWireColor(color) {
    this.selectedColor = color;
  }

  setProbeMode(active) {
    this.probeActive = active;
    this.draggedICType = null;
    if (this.canvas) {
      this.canvas.style.cursor = active ? 'crosshair' : 'default';
    }
  }

  setDraggedIC(type) {
    this.draggedICType = type;
    this.probeActive = false;
    if (this.canvas) {
      this.canvas.style.cursor = type ? 'grab' : 'default';
    }
  }

  initEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());

    // Mouse Move Listener
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      // Check hovering over socket targets
      this.hoverTarget = this.findNearestSocket(this.mousePos.x, this.mousePos.y);
      this.hoverWire = this.findWireAt(this.mousePos.x, this.mousePos.y);

      if (this.probeActive && this.hoverTarget && window.appEngine) {
        const netKey = this.getSocketNetKey(this.hoverTarget);
        this.probeVoltage = window.appEngine.simulation.getNodeState(netKey);
        this.probePosition = { x: this.mousePos.x, y: this.mousePos.y };
      } else {
        this.probePosition = null;
      }

      this.requestRender();
    });

    // Mouse Down Listener (Start Drag Wire or Drag IC Drop)
    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Only left click

      if (this.draggedICType) {
        // Drop IC onto breadboard
        const col = this.getColFromX(this.mousePos.x);
        if (col >= 1 && col <= this.cols - 8) {
          this.placeIC(this.draggedICType, col);
          this.draggedICType = null;
          this.canvas.style.cursor = 'default';
        }
        return;
      }

      if (this.probeActive) return;

      if (this.hoverTarget) {
        this.activeWireStart = this.hoverTarget;
        this.isDraggingWire = true;
        if (window.soundFx) window.soundFx.playClick();
        this.requestRender();
      }
    });

    // Mouse Up Listener (Complete Drag Wire)
    this.canvas.addEventListener('mouseup', (e) => {
      if (e.button !== 0) return;

      if (this.isDraggingWire && this.activeWireStart) {
        if (this.hoverTarget && this.hoverTarget !== this.activeWireStart) {
          this.addWire(this.activeWireStart, this.hoverTarget, this.selectedColor);
          if (window.soundFx) window.soundFx.playWireConnect();
        }
        this.activeWireStart = null;
        this.isDraggingWire = false;
        this.requestRender();
      }
    });

    // Click Listener (Click-to-wire support)
    this.canvas.addEventListener('click', (e) => {
      if (this.probeActive || this.isDraggingWire) return;

      if (this.hoverTarget) {
        if (!this.activeWireStart) {
          this.activeWireStart = this.hoverTarget;
          if (window.soundFx) window.soundFx.playClick();
        } else {
          if (this.activeWireStart !== this.hoverTarget) {
            this.addWire(this.activeWireStart, this.hoverTarget, this.selectedColor);
            if (window.soundFx) window.soundFx.playWireConnect();
          }
          this.activeWireStart = null;
        }
      } else if (!this.hoverTarget) {
        this.activeWireStart = null;
      }
      this.requestRender();
    });

    // Context Menu Listener (Right-click delete wire or cancel wiring)
    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (this.activeWireStart || this.draggedICType) {
        this.activeWireStart = null;
        this.draggedICType = null;
        this.canvas.style.cursor = 'default';
        this.requestRender();
        return;
      }
      const wireIdx = this.findWireAt(this.mousePos.x, this.mousePos.y);
      if (wireIdx !== -1) {
        this.wires.splice(wireIdx, 1);
        if (window.soundFx) window.soundFx.playWireRemove();
        if (window.appEngine) window.appEngine.stepSimulation();
        this.requestRender();
      }
    });
  }

  resizeCanvas() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.requestRender();
  }

  requestRender() {
    requestAnimationFrame(() => this.render());
  }

  getSocketNetKey(socket) {
    if (socket.type === 'trainer') {
      return `trainer:${socket.id}`;
    } else if (socket.type === 'breadboard') {
      return `bb:${socket.section}:${socket.col}:${socket.row}`;
    } else if (socket.type === 'ic') {
      return `ic:${socket.id}:${socket.pin}`;
    }
    return '';
  }

  getBreadboardHoleNet(union) {
    // Top Power Rails
    for (let c = 2; c <= this.cols; c++) {
      union(`bb:top_plus:1:0`, `bb:top_plus:${c}:0`);
      union(`bb:top_minus:1:0`, `bb:top_minus:${c}:0`);
      union(`bb:bot_plus:1:0`, `bb:bot_plus:${c}:0`);
      union(`bb:bot_minus:1:0`, `bb:bot_minus:${c}:0`);
    }

    // Vertical Columns A-E and F-J
    const rowsUpper = ['A', 'B', 'C', 'D', 'E'];
    const rowsLower = ['F', 'G', 'H', 'I', 'J'];

    for (let col = 1; col <= this.cols; col++) {
      for (let r = 1; r < rowsUpper.length; r++) {
        union(`bb:main:${col}:${rowsUpper[0]}`, `bb:main:${col}:${rowsUpper[r]}`);
      }
      for (let r = 1; r < rowsLower.length; r++) {
        union(`bb:main:${col}:${rowsLower[0]}`, `bb:main:${col}:${rowsLower[r]}`);
      }
    }

    // IC Pins to Breadboard Holes
    this.placedICs.forEach(ic => {
      const pinCount = ic.pinCount || 16;
      const halfPins = pinCount / 2;

      for (let p = 0; p < halfPins; p++) {
        const pinNum = pinCount - p;
        const col = ic.startCol + p;
        union(`bb:main:${col}:E`, `ic:${ic.id}:${pinNum}`);
      }
      for (let p = 0; p < halfPins; p++) {
        const pinNum = p + 1;
        const col = ic.startCol + p;
        union(`bb:main:${col}:F`, `ic:${ic.id}:${pinNum}`);
      }
    });
  }

  addWire(fromSocket, toSocket, color) {
    this.wires.push({
      id: 'wire_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      from: { ...fromSocket },
      to: { ...toSocket },
      color: color
    });
    if (window.appEngine) window.appEngine.stepSimulation();
  }

  clearWires() {
    this.wires = [];
    if (window.appEngine) window.appEngine.stepSimulation();
    this.requestRender();
  }

  placeIC(type, startCol = 25) {
    const spec = this.icSpecs[type];
    if (!spec) return;

    this.placedICs = this.placedICs.filter(ic => Math.abs(ic.startCol - startCol) > (spec.pins / 2));

    const ic = {
      id: 'ic_' + type + '_' + Date.now(),
      type: type,
      pinCount: spec.pins,
      startCol: startCol,
      label: spec.name
    };

    this.placedICs.push(ic);
    if (window.soundFx) window.soundFx.playClick();
    if (window.appEngine) window.appEngine.stepSimulation();
    this.requestRender();
  }

  findNearestSocket(x, y) {
    let closest = null;
    let minDistance = 16; // Snap radius

    for (const socket of this.socketTargets) {
      const dx = socket.x - x;
      const dy = socket.y - y;
      const dist = Math.hypot(dx, dy);
      if (dist < minDistance) {
        minDistance = dist;
        closest = socket;
      }
    }
    return closest;
  }

  findWireAt(x, y) {
    for (let i = this.wires.length - 1; i >= 0; i--) {
      const w = this.wires[i];
      const from = this.getSocketCoords(w.from);
      const to = this.getSocketCoords(w.to);
      if (from && to) {
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2 + Math.min(60, Math.abs(from.x - to.x) * 0.4);
        const dist = this.distanceToBezier(x, y, from.x, from.y, midX, midY, to.x, to.y);
        if (dist < 12) return i;
      }
    }
    return -1;
  }

  getSocketCoords(socketRef) {
    const found = this.socketTargets.find(s => {
      if (s.type !== socketRef.type) return false;
      if (s.type === 'trainer') return s.id === socketRef.id;
      if (s.type === 'breadboard') return s.section === socketRef.section && s.col === socketRef.col && s.row === socketRef.row;
      if (s.type === 'ic') return s.id === socketRef.id && s.pin === socketRef.pin;
      return false;
    });
    return found ? { x: found.x, y: found.y } : null;
  }

  distanceToBezier(px, py, x0, y0, x1, y1, x2, y2) {
    let minDist = Infinity;
    const STEPS = 20;
    for (let i = 0; i <= STEPS; i++) {
      const t = i / STEPS;
      const bx = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
      const by = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2;
      const dist = Math.hypot(px - bx, py - by);
      if (dist < minDist) minDist = dist;
    }
    return minDist;
  }

  getColFromX(x) {
    const rect = this.container.getBoundingClientRect();
    const bbWidth = 980;
    const bbX = Math.max(20, (rect.width - bbWidth) / 2);
    const startX = bbX + 30;
    const holeSpacingX = (bbWidth - 60) / (this.cols - 1);
    return Math.round((x - startX) / holeSpacingX) + 1;
  }

  render() {
    if (!this.canvas || !this.container) return;
    const ctx = this.ctx;
    const rect = this.container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    ctx.save();
    ctx.scale(this.dpr, this.dpr);

    ctx.clearRect(0, 0, W, H);
    this.socketTargets = []; // Rebuild target list

    const trainerHeight = 180;
    const bbY = trainerHeight + 30;
    const bbWidth = 980;
    const bbHeight = 240;
    const bbX = Math.max(20, (W - bbWidth) / 2);

    // 1. Draw Digital Trainer Kit Panel
    this.renderTrainerPanel(ctx, 20, 15, W - 40, trainerHeight);

    // 2. Draw Solderless Breadboard
    this.renderBreadboard(ctx, bbX, bbY, bbWidth, bbHeight);

    // 3. Draw Placed IC Chips
    this.renderICs(ctx, bbX, bbY);

    // 4. Highlight Connected Holes in same Column/Rail on hover
    if (this.hoverTarget) {
      this.renderConnectedHoleHighlights(ctx, this.hoverTarget);
    }

    // 5. Draw Wires Overlay
    this.renderWires(ctx);

    // 6. Active Wire Drag Line
    if (this.activeWireStart && this.mousePos) {
      ctx.beginPath();
      ctx.moveTo(this.activeWireStart.x, this.activeWireStart.y);
      const midY = (this.activeWireStart.y + this.mousePos.y) / 2 + 40;
      ctx.quadraticCurveTo((this.activeWireStart.x + this.mousePos.x) / 2, midY, this.mousePos.x, this.mousePos.y);
      ctx.strokeStyle = this.selectedColor;
      ctx.lineWidth = 4;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 7. Hover Socket Ring & Tooltip
    if (this.hoverTarget) {
      ctx.beginPath();
      ctx.arc(this.hoverTarget.x, this.hoverTarget.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      if (this.hoverTarget.label) {
        ctx.font = 'bold 11px Inter, sans-serif';
        const txtWidth = ctx.measureText(this.hoverTarget.label).width;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.fillRect(this.hoverTarget.x - txtWidth / 2 - 6, this.hoverTarget.y - 28, txtWidth + 12, 20);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.hoverTarget.x - txtWidth / 2 - 6, this.hoverTarget.y - 28, txtWidth + 12, 20);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(this.hoverTarget.label, this.hoverTarget.x - txtWidth / 2, this.hoverTarget.y - 14);
      }
    }

    // 8. Hover Wire Delete Hint
    if (this.hoverWire !== -1 && !this.hoverTarget) {
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('❌ Right-Click to Delete Wire', this.mousePos.x + 12, this.mousePos.y - 10);
    }

    // 9. Dragging IC Placement Ghost Preview
    if (this.draggedICType) {
      const col = this.getColFromX(this.mousePos.x);
      const spec = this.icSpecs[this.draggedICType];
      if (spec && col >= 1 && col <= this.cols - 8) {
        const holeSpacingX = (bbWidth - 60) / (this.cols - 1);
        const startX = bbX + 30;
        const centerTrenchY = bbY + bbHeight / 2;
        const icWidth = (spec.pins / 2) * holeSpacingX + 8;
        const icX = startX + (col - 1) * holeSpacingX - 4;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.roundRect(icX, centerTrenchY - 18, icWidth, 36, 4);
        ctx.fill();
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(`Drop IC ${spec.name} at Column ${col}`, this.mousePos.x + 15, this.mousePos.y + 15);
      }
    }

    // 10. Logic Probe Floating View
    if (this.probePosition && this.probeVoltage !== null) {
      ctx.font = 'bold 12px monospace';
      const statusTxt = `PROBE: ${this.probeVoltage === 1 ? 'HIGH (5V)' : 'LOW (0V)'}`;
      ctx.fillStyle = this.probeVoltage === 1 ? '#22c55e' : '#ef4444';
      ctx.fillRect(this.probePosition.x + 12, this.probePosition.y - 30, 140, 24);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(statusTxt, this.probePosition.x + 20, this.probePosition.y - 14);
    }

    // 11. Top Wiring Status Guidance Banner
    this.renderWiringBanner(ctx, W);

    ctx.restore();
  }

  renderWiringBanner(ctx, W) {
    let text = '💡 Click any Socket or Hole to start placing a Jumper Wire | Drag IC from drawer to Breadboard';
    let color = '#38bdf8';

    if (this.activeWireStart) {
      text = `🔌 WIRING ACTIVE: Drag or click destination hole to connect [Source: ${this.activeWireStart.label || 'Socket'}]`;
      color = '#f59e0b';
    } else if (this.draggedICType) {
      text = `📦 PLACING IC ${this.draggedICType}: Move cursor over Breadboard DIP channel and click to drop chip!`;
      color = '#a855f7';
    } else if (this.probeActive) {
      text = `🔍 LOGIC PROBE ACTIVE: Hover over any breadboard hole, switch, or IC pin to read voltage level!`;
      color = '#22c55e';
    }

    ctx.font = 'bold 12px Inter, sans-serif';
    const txtWidth = ctx.measureText(text).width;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect((W - txtWidth) / 2 - 14, 2, txtWidth + 28, 22);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect((W - txtWidth) / 2 - 14, 2, txtWidth + 28, 22);
    ctx.fillStyle = color;
    ctx.fillText(text, (W - txtWidth) / 2, 17);
  }

  renderConnectedHoleHighlights(ctx, socket) {
    if (socket.type !== 'breadboard') return;

    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    this.socketTargets.forEach(s => {
      if (s.type === 'breadboard') {
        if (socket.section === 'main' && s.section === 'main' && socket.col === s.col) {
          // Highlight same vertical column
          if ((['A','B','C','D','E'].includes(socket.row) && ['A','B','C','D','E'].includes(s.row)) ||
              (['F','G','H','I','J'].includes(socket.row) && ['F','G','H','I','J'].includes(s.row))) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (socket.section.includes('plus') && s.section === socket.section) {
          // Highlight power rail
          ctx.beginPath();
          ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
  }

  renderTrainerPanel(ctx, x, y, width, height) {
    const gradient = ctx.createLinearGradient(x, y, x, y + height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.roundRect(x, y, width, height, 12);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('DIGITAL LOGIC TRAINER KIT (MODEL DL-100)', x + 20, y + 25);

    const pwrX = x + 30;
    const pwrY = y + 50;

    // +5V VCC
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('+5V VCC', pwrX, pwrY);
    this.drawSocket(ctx, pwrX + 20, pwrY + 20, '#ef4444', { type: 'trainer', id: 'VCC', label: '+5V VCC Power Socket' });

    // GND
    ctx.fillStyle = '#64748b';
    ctx.fillText('GND', pwrX + 80, pwrY);
    this.drawSocket(ctx, pwrX + 90, pwrY + 20, '#475569', { type: 'trainer', id: 'GND', label: 'Ground (0V) Socket' });

    // Data Input Switches I0 - I7
    const swX = x + 220;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('DATA INPUT SWITCHES (I0 - I7)', swX, pwrY);

    const sim = window.appEngine ? window.appEngine.simulation : null;

    for (let i = 0; i < 8; i++) {
      const swKey = `I${i}`;
      const val = sim ? sim.trainerSwitches[swKey] : 0;
      const posX = swX + i * 40;
      const posY = pwrY + 25;

      ctx.fillStyle = val ? '#22c55e' : '#334155';
      ctx.fillRect(posX - 9, posY - 12, 18, 26);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(val ? '1' : '0', posX - 3, val ? posY + 8 : posY - 2);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px sans-serif';
      ctx.fillText(`I${i}`, posX - 4, posY + 28);

      this.drawSocket(ctx, posX, posY + 42, val ? '#22c55e' : '#64748b', {
        type: 'trainer',
        id: swKey,
        label: `Data Switch I${i} [State: ${val}]`
      });
    }

    // Select Switches (S0, S1, S2, E_BAR)
    const selX = x + 580;
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('SELECT & STROBE CONTROL', selX, pwrY);

    const selSwitches = [
      { key: 'S0', name: 'S0 (A)' },
      { key: 'S1', name: 'S1 (B)' },
      { key: 'S2', name: 'S2 (C)' },
      { key: 'E_BAR', name: 'Ē (Strobe)' }
    ];

    selSwitches.forEach((sw, idx) => {
      const val = sim ? sim.trainerSwitches[sw.key] : 0;
      const posX = selX + idx * 45;
      const posY = pwrY + 25;

      ctx.fillStyle = val ? '#f59e0b' : '#334155';
      ctx.fillRect(posX - 9, posY - 12, 18, 26);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(val ? '1' : '0', posX - 3, val ? posY + 8 : posY - 2);

      ctx.fillStyle = '#fde68a';
      ctx.fillText(sw.name, posX - 12, posY + 28);

      this.drawSocket(ctx, posX, posY + 42, val ? '#f59e0b' : '#64748b', {
        type: 'trainer',
        id: sw.key,
        label: `${sw.name} Switch [State: ${val}]`
      });
    });

    // Output LEDs (Y1, Y1_BAR, Y2, LED0)
    const ledX = x + 790;
    ctx.fillStyle = '#a855f7';
    ctx.fillText('OUTPUT LED INDICATORS', ledX, pwrY);

    const leds = [
      { id: 'Y1', label: 'Y' },
      { id: 'Y1_BAR', label: 'Ȳ (W)' },
      { id: 'Y2', label: 'Y2' },
      { id: 'LED0', label: 'LED0' }
    ];

    leds.forEach((l, idx) => {
      const posX = ledX + idx * 42;
      const posY = pwrY + 25;
      const active = sim ? sim.ledOutputs[l.id] : 0;

      ctx.beginPath();
      ctx.arc(posX, posY, 10, 0, Math.PI * 2);
      ctx.fillStyle = active ? '#22c55e' : '#1e293b';
      ctx.strokeStyle = active ? '#86efac' : '#475569';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      if (active) {
        ctx.beginPath();
        ctx.arc(posX, posY, 16, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
        ctx.fill();
      }

      ctx.fillStyle = '#e9d5ff';
      ctx.fillText(l.label, posX - 8, posY + 28);

      this.drawSocket(ctx, posX, posY + 42, active ? '#22c55e' : '#64748b', {
        type: 'trainer',
        id: l.id,
        label: `Output LED ${l.label} [State: ${active}]`
      });
    });
  }

  renderBreadboard(ctx, x, y, width, height) {
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.roundRect(x, y, width, height, 8);
    ctx.fill();
    ctx.stroke();

    const centerTrenchY = y + height / 2;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(x + 10, centerTrenchY - 6, width - 20, 12);

    const holeSpacingX = (width - 60) / (this.cols - 1);
    const startX = x + 30;

    // Top Power Bus
    const topPlusY = y + 20;
    const topMinusY = y + 36;

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, topPlusY - 8);
    ctx.lineTo(startX + (this.cols - 1) * holeSpacingX, topPlusY - 8);
    ctx.stroke();

    ctx.strokeStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(startX, topMinusY + 8);
    ctx.lineTo(startX + (this.cols - 1) * holeSpacingX, topMinusY + 8);
    ctx.stroke();

    for (let c = 1; c <= this.cols; c++) {
      const hx = startX + (c - 1) * holeSpacingX;
      this.drawSocket(ctx, hx, topPlusY, '#94a3b8', { type: 'breadboard', section: 'top_plus', col: c, row: 0, label: `Top Rail (+5V) Col ${c}` }, 3);
      this.drawSocket(ctx, hx, topMinusY, '#94a3b8', { type: 'breadboard', section: 'top_minus', col: c, row: 0, label: `Top Rail (GND) Col ${c}` }, 3);
    }

    // Main Upper Terminal Grid (A-E)
    const rowsUpper = ['A', 'B', 'C', 'D', 'E'];
    const startUpperY = y + 60;
    const rowGap = 13;

    rowsUpper.forEach((rLabel, rIdx) => {
      const hy = startUpperY + rIdx * rowGap;
      for (let c = 1; c <= this.cols; c++) {
        const hx = startX + (c - 1) * holeSpacingX;
        this.drawSocket(ctx, hx, hy, '#64748b', { type: 'breadboard', section: 'main', col: c, row: rLabel, label: `Hole ${rLabel}${c}` }, 3.5);
      }
    });

    // Main Lower Terminal Grid (F-J)
    const rowsLower = ['F', 'G', 'H', 'I', 'J'];
    const startLowerY = centerTrenchY + 15;

    rowsLower.forEach((rLabel, rIdx) => {
      const hy = startLowerY + rIdx * rowGap;
      for (let c = 1; c <= this.cols; c++) {
        const hx = startX + (c - 1) * holeSpacingX;
        this.drawSocket(ctx, hx, hy, '#64748b', { type: 'breadboard', section: 'main', col: c, row: rLabel, label: `Hole ${rLabel}${c}` }, 3.5);
      }
    });

    // Bottom Power Bus
    const botPlusY = y + height - 36;
    const botMinusY = y + height - 20;

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, botPlusY - 8);
    ctx.lineTo(startX + (this.cols - 1) * holeSpacingX, botPlusY - 8);
    ctx.stroke();

    ctx.strokeStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(startX, botMinusY + 8);
    ctx.lineTo(startX + (this.cols - 1) * holeSpacingX, botMinusY + 8);
    ctx.stroke();

    for (let c = 1; c <= this.cols; c++) {
      const hx = startX + (c - 1) * holeSpacingX;
      this.drawSocket(ctx, hx, botPlusY, '#94a3b8', { type: 'breadboard', section: 'bot_plus', col: c, row: 0, label: `Bot Rail (+5V) Col ${c}` }, 3);
      this.drawSocket(ctx, hx, botMinusY, '#94a3b8', { type: 'breadboard', section: 'bot_minus', col: c, row: 0, label: `Bot Rail (GND) Col ${c}` }, 3);
    }

    ctx.fillStyle = '#64748b';
    ctx.font = '9px monospace';
    for (let c = 5; c <= this.cols; c += 5) {
      const hx = startX + (c - 1) * holeSpacingX;
      ctx.fillText(c.toString(), hx - 5, y + 54);
    }
  }

  renderICs(ctx, bbX, bbY) {
    const holeSpacingX = (980 - 60) / (this.cols - 1);
    const startX = bbX + 30;
    const centerTrenchY = bbY + 240 / 2;

    this.placedICs.forEach(ic => {
      const spec = this.icSpecs[ic.type];
      if (!spec) return;

      const halfPins = spec.pins / 2;
      const icWidth = halfPins * holeSpacingX + 8;
      const icHeight = 36;
      const icX = startX + (ic.startCol - 1) * holeSpacingX - 4;
      const icY = centerTrenchY - icHeight / 2;

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.roundRect(icX, icY, icWidth, icHeight, 4);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(icX + 4, icY + icHeight / 2, 4, -Math.PI / 2, Math.PI / 2);
      ctx.fillStyle = '#334155';
      ctx.fill();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px Inter, monospace';
      ctx.fillText(spec.name, icX + 16, icY + 22);

      // Top Pins
      for (let p = 0; p < halfPins; p++) {
        const pinNum = spec.pins - p;
        const hx = startX + (ic.startCol - 1 + p) * holeSpacingX;
        const hy = centerTrenchY - 18;
        const pinName = spec.pinLabels[pinNum - 1] || `Pin ${pinNum}`;
        this.drawSocket(ctx, hx, hy, '#cbd5e1', {
          type: 'ic',
          id: ic.id,
          pin: pinNum,
          label: `IC ${spec.name} Pin ${pinNum} (${pinName})`
        }, 3.5);
      }

      // Bottom Pins
      for (let p = 0; p < halfPins; p++) {
        const pinNum = p + 1;
        const hx = startX + (ic.startCol - 1 + p) * holeSpacingX;
        const hy = centerTrenchY + 18;
        const pinName = spec.pinLabels[pinNum - 1] || `Pin ${pinNum}`;
        this.drawSocket(ctx, hx, hy, '#cbd5e1', {
          type: 'ic',
          id: ic.id,
          pin: pinNum,
          label: `IC ${spec.name} Pin ${pinNum} (${pinName})`
        }, 3.5);
      }
    });
  }

  renderWires(ctx) {
    const sim = window.appEngine ? window.appEngine.simulation : null;

    this.wires.forEach((w, idx) => {
      const fromPos = this.getSocketCoords(w.from);
      const toPos = this.getSocketCoords(w.to);
      if (!fromPos || !toPos) return;

      const netKeyFrom = this.getSocketNetKey(w.from);
      const val = sim ? sim.getNodeState(netKeyFrom) : 0;
      const isHigh = (val === 1);
      const isHovered = (this.hoverWire === idx);

      ctx.beginPath();
      ctx.moveTo(fromPos.x, fromPos.y);

      const dx = Math.abs(fromPos.x - toPos.x);
      const dy = Math.abs(fromPos.y - toPos.y);
      const arc = Math.min(80, Math.max(30, dx * 0.3 + dy * 0.2));

      const cpX = (fromPos.x + toPos.x) / 2;
      const cpY = Math.max(fromPos.y, toPos.y) + arc;

      ctx.quadraticCurveTo(cpX, cpY, toPos.x, toPos.y);

      ctx.strokeStyle = isHovered ? '#ffffff' : w.color;
      ctx.lineWidth = isHigh ? 6 : 4;
      ctx.stroke();

      if (isHigh) {
        ctx.strokeStyle = '#86efac';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.fillStyle = '#334155';
      ctx.fillRect(fromPos.x - 3, fromPos.y - 3, 6, 6);
      ctx.fillRect(toPos.x - 3, toPos.y - 3, 6, 6);
    });
  }

  drawSocket(ctx, x, y, color, targetData, radius = 4) {
    targetData.x = x;
    targetData.y = y;
    this.socketTargets.push(targetData);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

window.BreadboardEngine = BreadboardEngine;
