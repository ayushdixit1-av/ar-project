/**
 * 3D Photorealistic Breadboard & Digital IC Trainer Kit Renderer using Three.js
 */
class Lab3DScene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.controls = null;

        // Interactive object registries
        this.ledObjects = {};
        this.ledLights = {};
        this.switchObjects = {};
        this.icObjects = {};
        this.wireObjects = [];
        this.interactiveMeshes = [];

        // Raycasting for hover, tooltips & switch click
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.init();
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this.renderer.setSize(this.canvas.parentElement.clientWidth, this.canvas.parentElement.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0c101d);
        this.scene.fog = new THREE.FogExp2(0x0c101d, 0.012);

        const aspect = this.canvas.parentElement.clientWidth / this.canvas.parentElement.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(0, 20, 24);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 65;
        this.controls.target.set(0, 1, 0);

        this.setupLighting();
        this.buildEnvironment();

        window.addEventListener('resize', () => this.onWindowResize());
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));

        this.animate();
    }

    setupLighting() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.65);
        this.scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xfff8e7, 1.3);
        dirLight.position.set(15, 30, 20);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.bias = -0.0005;
        this.scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.45);
        fillLight.position.set(-15, 15, -15);
        this.scene.add(fillLight);
    }

    buildEnvironment() {
        // Wooden Table Surface
        const tableGeo = new THREE.BoxGeometry(75, 1, 50);
        const tableMat = new THREE.MeshStandardMaterial({
            color: 0xc8965d,
            roughness: 0.6,
            metalness: 0.1
        });
        const table = new THREE.Mesh(tableGeo, tableMat);
        table.position.set(0, -0.5, 0);
        table.receiveShadow = true;
        this.scene.add(table);

        // 1. Digital IC Logic Trainer Kit Enclosure
        this.createTrainerKitConsole();

        // 2. MB-102 Breadboard inside the Trainer Kit Bay
        this.createBreadboard();

        // 3. Components
        this.createICChips();
        this.createLEDs();
        this.createResistors();
        this.createSwitches();
    }

    createTrainerKitConsole() {
        const kitGroup = new THREE.Group();

        // Main Heavy Plastic/Steel Enclosure Base
        const kitGeo = new THREE.BoxGeometry(34, 1.2, 20);
        const kitMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.5,
            metalness: 0.3
        });
        const kitBase = new THREE.Mesh(kitGeo, kitMat);
        kitBase.position.set(0, 0.4, 0);
        kitBase.castShadow = true;
        kitBase.receiveShadow = true;
        kitGroup.add(kitBase);

        // Brushed Steel Top Control Faceplate
        const plateGeo = new THREE.BoxGeometry(33.6, 0.05, 19.6);
        const plateMat = new THREE.MeshStandardMaterial({
            color: 0x334155,
            roughness: 0.3,
            metalness: 0.7
        });
        const plate = new THREE.Mesh(plateGeo, plateMat);
        plate.position.set(0, 1.02, 0);
        plate.receiveShadow = true;
        kitGroup.add(plate);

        // Trainer Kit Branding & Label Text Canvas Texture
        const kitLabelCanvas = document.createElement('canvas');
        kitLabelCanvas.width = 1024;
        kitLabelCanvas.height = 128;
        const ctx = kitLabelCanvas.getContext('2d');
        ctx.fillStyle = '#334155';
        ctx.fillRect(0, 0, 1024, 128);
        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('DIGITAL IC LOGIC TRAINER KIT - MODEL DTK-101', 30, 50);
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('INPUT LOGIC SWITCHES (SW-1: A, SW-2: B, SW-3: CIN)  |  DC POWER: +5.00V REGULATED', 30, 95);

        const kitLabelTexture = new THREE.CanvasTexture(kitLabelCanvas);
        const kitLabelMat = new THREE.MeshBasicMaterial({ map: kitLabelTexture });
        const kitLabelPlane = new THREE.Mesh(new THREE.PlaneGeometry(33, 3), kitLabelMat);
        kitLabelPlane.rotation.x = -Math.PI / 2;
        kitLabelPlane.position.set(0, 1.05, -8);
        kitGroup.add(kitLabelPlane);

        // Power Section: Rocker Power Switch on Trainer Kit
        const pwrBoxGeo = new THREE.BoxGeometry(1.6, 0.5, 2.2);
        const pwrBoxMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
        const pwrBox = new THREE.Mesh(pwrBoxGeo, pwrBoxMat);
        pwrBox.position.set(-14, 1.25, -6);
        kitGroup.add(pwrBox);

        // Power Indicator Lamp (Red)
        const pwrLampGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16);
        const pwrLampMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1.0 });
        const pwrLamp = new THREE.Mesh(pwrLampGeo, pwrLampMat);
        pwrLamp.position.set(-14, 1.45, -4.2);
        kitGroup.add(pwrLamp);

        // Power Terminals (+5V Red socket, GND Black socket)
        const termGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16);
        const redTermMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.5 });
        const blackTermMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.5 });

        const termVCC = new THREE.Mesh(termGeo, redTermMat);
        termVCC.position.set(-11.5, 1.2, -6);
        kitGroup.add(termVCC);

        const termGND = new THREE.Mesh(termGeo, blackTermMat);
        termGND.position.set(-11.5, 1.2, -4.2);
        kitGroup.add(termGND);

        // Digital Voltmeter 7-Segment LED Display (Reading +5.00V)
        const vmCanvas = document.createElement('canvas');
        vmCanvas.width = 256;
        vmCanvas.height = 128;
        const vmCtx = vmCanvas.getContext('2d');
        vmCtx.fillStyle = '#000000';
        vmCtx.fillRect(0, 0, 256, 128);
        vmCtx.fillStyle = '#ef4444';
        vmCtx.font = 'bold 50px monospace';
        vmCtx.textAlign = 'center';
        vmCtx.textBaseline = 'middle';
        vmCtx.fillText('+5.00V', 128, 64);

        const vmTexture = new THREE.CanvasTexture(vmCanvas);
        const vmMat = new THREE.MeshBasicMaterial({ map: vmTexture });
        const vmPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 1.8), vmMat);
        vmPlane.rotation.x = -Math.PI / 2;
        vmPlane.position.set(-8, 1.05, -5.1);
        kitGroup.add(vmPlane);

        this.scene.add(kitGroup);
    }

    createBreadboard() {
        const boardGroup = new THREE.Group();
        const width = 24;
        const depth = 9;
        const height = 0.8;

        const bodyGeo = new THREE.BoxGeometry(width, height, depth);
        const bodyMat = new THREE.MeshStandardMaterial({
            color: 0xf8fafc,
            roughness: 0.4,
            metalness: 0.05
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.set(0, 1.0 + (height / 2), 0); // elevated inside trainer bay
        body.castShadow = true;
        body.receiveShadow = true;
        boardGroup.add(body);

        const notchGeo = new THREE.BoxGeometry(width + 0.1, 0.3, 0.6);
        const notchMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.8 });
        const notch = new THREE.Mesh(notchGeo, notchMat);
        notch.position.set(0, 1.8, 0);
        boardGroup.add(notch);

        const lineGeo = new THREE.BoxGeometry(width * 0.9, 0.02, 0.08);
        const redLineMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const blueLineMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });

        const redTop = new THREE.Mesh(lineGeo, redLineMat);
        redTop.position.set(0, 1.81, -3.8);
        boardGroup.add(redTop);

        const blueTop = new THREE.Mesh(lineGeo, blueLineMat);
        blueTop.position.set(0, 1.81, -4.1);
        boardGroup.add(blueTop);

        const redBot = new THREE.Mesh(lineGeo, redLineMat);
        redBot.position.set(0, 1.81, 3.8);
        boardGroup.add(redBot);

        const blueBot = new THREE.Mesh(lineGeo, blueLineMat);
        blueBot.position.set(0, 1.81, 4.1);
        boardGroup.add(blueBot);

        const holeGeo = new THREE.BoxGeometry(0.18, 0.02, 0.18);
        const holeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
        const holeInstancedMesh = new THREE.InstancedMesh(holeGeo, holeMat, 830);
        let holeIndex = 0;
        const dummy = new THREE.Object3D();

        for (let col = 0; col < 30; col++) {
            const x = -10.5 + (col * 0.72);
            for (let row = 0; row < 5; row++) {
                dummy.position.set(x, 1.81, -3.0 + (row * 0.5));
                dummy.updateMatrix();
                holeInstancedMesh.setMatrixAt(holeIndex++, dummy.matrix);
            }
            for (let row = 0; row < 5; row++) {
                dummy.position.set(x, 1.81, 0.8 + (row * 0.5));
                dummy.updateMatrix();
                holeInstancedMesh.setMatrixAt(holeIndex++, dummy.matrix);
            }
            dummy.position.set(x, 1.81, -3.8);
            dummy.updateMatrix();
            holeInstancedMesh.setMatrixAt(holeIndex++, dummy.matrix);

            dummy.position.set(x, 1.81, 3.8);
            dummy.updateMatrix();
            holeInstancedMesh.setMatrixAt(holeIndex++, dummy.matrix);
        }

        holeInstancedMesh.instanceMatrix.needsUpdate = true;
        boardGroup.add(holeInstancedMesh);

        this.scene.add(boardGroup);
    }

    createICChips() {
        const icPositions = {
            '7486': { x: -4, label: 'HD74LS86P (XOR)' },
            '7408': { x: 2, label: 'SN74LS08N (AND)' },
            '7432': { x: 8, label: 'SN74LS32N (OR)' }
        };

        for (const [type, data] of Object.entries(icPositions)) {
            const icGroup = new THREE.Group();
            icGroup.position.set(data.x, 1.6, 0);

            const bodyGeo = new THREE.BoxGeometry(3.6, 0.5, 1.4);
            const bodyMat = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                roughness: 0.5,
                metalness: 0.2
            });
            const icBody = new THREE.Mesh(bodyGeo, bodyMat);
            icBody.position.y = 0.4;
            icBody.castShadow = true;
            icGroup.add(icBody);

            const notchGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.52, 16, 1, false, 0, Math.PI);
            const notchMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
            const notch = new THREE.Mesh(notchGeo, notchMat);
            notch.rotation.z = Math.PI / 2;
            notch.position.set(-1.8, 0.4, 0);
            icGroup.add(notch);

            const pinGeo = new THREE.BoxGeometry(0.12, 0.6, 0.1);
            const pinMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.2 });

            for (let i = 0; i < 7; i++) {
                const pinX = -1.35 + (i * 0.45);
                
                const pinBot = new THREE.Mesh(pinGeo, pinMat);
                pinBot.position.set(pinX, 0.1, 0.75);
                pinBot.name = `pin_${type}_${i + 1}`;
                pinBot.userData = { ic: type, pin: i + 1 };
                icGroup.add(pinBot);
                this.interactiveMeshes.push(pinBot);

                const pinTop = new THREE.Mesh(pinGeo, pinMat);
                pinTop.position.set(pinX, 0.1, -0.75);
                const pinNum = 14 - i;
                pinTop.name = `pin_${type}_${pinNum}`;
                pinTop.userData = { ic: type, pin: pinNum };
                icGroup.add(pinTop);
                this.interactiveMeshes.push(pinTop);
            }

            const labelCanvas = document.createElement('canvas');
            labelCanvas.width = 256;
            labelCanvas.height = 64;
            const ctx = labelCanvas.getContext('2d');
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, 256, 64);
            ctx.fillStyle = '#f8fafc';
            ctx.font = 'bold 22px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(type === '7486' ? '74LS86 (XOR)' : type === '7408' ? '74LS08 (AND)' : '74LS32 (OR)', 128, 32);

            const labelTexture = new THREE.CanvasTexture(labelCanvas);
            const labelMat = new THREE.MeshBasicMaterial({ map: labelTexture });
            const labelPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.2), labelMat);
            labelPlane.rotation.x = -Math.PI / 2;
            labelPlane.position.y = 0.66;
            icGroup.add(labelPlane);

            this.icObjects[type] = icGroup;
            this.scene.add(icGroup);
        }
    }

    createLEDs() {
        const ledConfigs = {
            sum: { x: -8, z: 2.2, color: 0xff1a1a, glowColor: 0xff0000 },
            carry: { x: -5, z: 2.2, color: 0x00ff66, glowColor: 0x00ff66 }
        };

        for (const [key, cfg] of Object.entries(ledConfigs)) {
            const ledGroup = new THREE.Group();
            ledGroup.position.set(cfg.x, 1.6, cfg.z);

            const leadGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2);
            const leadMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9 });
            
            const lead1 = new THREE.Mesh(leadGeo, leadMat);
            lead1.position.set(-0.15, 0.4, 0);
            ledGroup.add(lead1);

            const lead2 = new THREE.Mesh(leadGeo, leadMat);
            lead2.position.set(0.15, 0.4, 0);
            ledGroup.add(lead2);

            const ringGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.2, 32);
            const ringMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.2 });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.y = 1.0;
            ledGroup.add(ring);

            const domeGeo = new THREE.SphereGeometry(0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
            const domeMat = new THREE.MeshPhysicalMaterial({
                color: cfg.color,
                emissive: 0x000000,
                emissiveIntensity: 0,
                transmission: 0.6,
                opacity: 0.95,
                transparent: true,
                roughness: 0.1,
                ior: 1.5
            });
            const dome = new THREE.Mesh(domeGeo, domeMat);
            dome.position.y = 1.1;
            dome.castShadow = true;
            ledGroup.add(dome);

            const pLight = new THREE.PointLight(cfg.glowColor, 0, 10);
            pLight.position.set(0, 1.2, 0);
            ledGroup.add(pLight);

            this.ledObjects[key] = domeMat;
            this.ledLights[key] = pLight;
            this.scene.add(ledGroup);
        }
    }

    createResistors() {
        const resistorPositions = [
            { x: -8, z: 0.5 },
            { x: -5, z: 0.5 }
        ];

        resistorPositions.forEach(pos => {
            const resGroup = new THREE.Group();
            resGroup.position.set(pos.x, 1.6, pos.z);

            const bodyGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16);
            const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 });
            const body = new THREE.Mesh(bodyGeo, bodyMat);
            body.rotation.z = Math.PI / 2;
            body.position.y = 0.4;
            resGroup.add(body);

            const wireGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.0);
            const wireMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9 });
            const w1 = new THREE.Mesh(wireGeo, wireMat);
            w1.position.set(-0.5, 0.2, 0);
            resGroup.add(w1);

            const w2 = new THREE.Mesh(wireGeo, wireMat);
            w2.position.set(0.5, 0.2, 0);
            resGroup.add(w2);

            this.scene.add(resGroup);
        });
    }

    createSwitches() {
        // Heavy Duty Trainer Kit Input Toggle Switch Panel (Mounted on Trainer Board at Z: 6.8)
        const inputs = ['A', 'B', 'Cin'];
        inputs.forEach((inp, idx) => {
            const switchGroup = new THREE.Group();
            switchGroup.position.set(-10 + (idx * 2.2), 1.05, 6.8);

            // Metal SPDT Toggle Switch Base Housing
            const baseGeo = new THREE.BoxGeometry(1.4, 0.5, 1.6);
            const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.6 });
            const base = new THREE.Mesh(baseGeo, baseMat);
            base.position.y = 0.25;
            switchGroup.add(base);

            // Switch Labeling Plate
            const lblCanvas = document.createElement('canvas');
            lblCanvas.width = 128;
            lblCanvas.height = 64;
            const lCtx = lblCanvas.getContext('2d');
            lCtx.fillStyle = '#0f172a';
            lCtx.fillRect(0, 0, 128, 64);
            lCtx.fillStyle = '#f59e0b';
            lCtx.font = 'bold 24px sans-serif';
            lCtx.textAlign = 'center';
            lCtx.textBaseline = 'middle';
            lCtx.fillText(`SW: ${inp}`, 64, 32);

            const lblTexture = new THREE.CanvasTexture(lblCanvas);
            const lblMat = new THREE.MeshBasicMaterial({ map: lblTexture });
            const lblPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), lblMat);
            lblPlane.rotation.x = -Math.PI / 2;
            lblPlane.position.set(0, 0.51, 0.6);
            switchGroup.add(lblPlane);

            // Metallic Toggle Lever
            const leverGeo = new THREE.CylinderGeometry(0.12, 0.08, 1.0, 16);
            const leverMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95, roughness: 0.1 });
            const lever = new THREE.Mesh(leverGeo, leverMat);
            lever.rotation.x = -Math.PI / 6; // Default OFF (down angle)
            lever.position.set(0, 0.75, 0);
            lever.name = `switch_${inp}`;
            lever.userData = { input: inp };
            switchGroup.add(lever);

            // Logic State Indicator Lamp (Green for 1 HIGH, Dark Red for 0 LOW)
            const lampGeo = new THREE.SphereGeometry(0.2, 16, 16);
            const lampMat = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, emissive: 0x000000 });
            const lamp = new THREE.Mesh(lampGeo, lampMat);
            lamp.position.set(0, 0.55, -0.5);
            lamp.name = `lamp_${inp}`;
            switchGroup.add(lamp);

            this.switchObjects[inp] = lever;
            this.interactiveMeshes.push(lever);
            this.interactiveMeshes.push(base);
            base.userData = { input: inp };
            this.scene.add(switchGroup);
        });
    }

    setICVisibility(mode) {
        if (this.icObjects['7432']) {
            this.icObjects['7432'].visible = (mode === 'full');
        }
    }

    updateWires(mode, pinStates, tracing) {
        this.setICVisibility(mode);

        this.wireObjects.forEach(w => this.scene.remove(w));
        this.wireObjects = [];

        // STRICT 3-COLOR PALETTE: RED, BLACK, YELLOW
        const COLOR_RED = 0xef4444;
        const COLOR_BLACK = 0x1e293b;
        const COLOR_YELLOW = 0xfacc15;

        const wireList = [];
        const isPowerOn = window.appCircuit ? window.appCircuit.power : true;

        // VCC (+5V) Wires from Trainer Kit Power Terminal (-11.5, 6.0) to Breadboard Power Rail
        wireList.push({ start: [-11.5, 1.4, -6.0], end: [-10.5, 2.4, -3.8], color: COLOR_RED, radius: 0.1 });
        wireList.push({ start: [-11.5, 1.4, -4.2], end: [-10.5, 2.4, 3.8], color: COLOR_BLACK, radius: 0.1 });

        // IC Power Connections
        wireList.push({ start: [-5.35, 2.4, -0.75], end: [-5.35, 1.82, -3.8], color: COLOR_RED, radius: 0.08 }); // 7486 VCC
        wireList.push({ start: [0.65, 2.4, -0.75], end: [0.65, 1.82, -3.8], color: COLOR_RED, radius: 0.08 });  // 7408 VCC
        wireList.push({ start: [-2.65, 2.4, 0.75], end: [-2.65, 1.82, 3.8], color: COLOR_BLACK, radius: 0.08 }); // 7486 GND
        wireList.push({ start: [3.35, 2.4, 0.75], end: [3.35, 1.82, 3.8], color: COLOR_BLACK, radius: 0.08 });   // 7408 GND

        // Trainer Kit Input Switches (at Z = 6.8) Patch Wires to Breadboard IC Inputs!
        const stateA = pinStates['7486_1'] ? pinStates['7486_1'].voltage > 0 : false;
        const stateB = pinStates['7486_2'] ? pinStates['7486_2'].voltage > 0 : false;
        const stateCin = pinStates['7486_5'] ? pinStates['7486_5'].voltage > 0 : false;

        const colorA = (tracing && stateA) ? COLOR_RED : COLOR_YELLOW;
        const colorB = (tracing && stateB) ? COLOR_RED : COLOR_YELLOW;
        const colorCin = (tracing && stateCin) ? COLOR_RED : COLOR_YELLOW;

        // Trainer Switch A (-10, 6.8) -> 7486 Pin 1 & 7408 Pin 1
        wireList.push({ start: [-10, 1.6, 6.8], end: [-5.35, 2.4, 0.75], color: colorA, radius: 0.08 });
        wireList.push({ start: [-5.35, 2.4, 0.75], end: [0.65, 2.4, 0.75], color: colorA, radius: 0.08 });

        // Trainer Switch B (-7.8, 6.8) -> 7486 Pin 2 & 7408 Pin 2
        wireList.push({ start: [-7.8, 1.6, 6.8], end: [-4.9, 2.4, 0.75], color: colorB, radius: 0.08 });
        wireList.push({ start: [-4.9, 2.4, 0.75], end: [1.1, 2.4, 0.75], color: colorB, radius: 0.08 });

        if (mode === 'half') {
            // Half Adder Outputs:
            const stateSum = pinStates['7486_3'] ? pinStates['7486_3'].voltage > 0 : false;
            const colorSum = stateSum ? COLOR_RED : COLOR_YELLOW;
            wireList.push({ start: [-4.45, 2.4, 0.75], end: [-8, 1.62, 2.2], color: colorSum, radius: 0.08 });

            const stateCarry = pinStates['7408_3'] ? pinStates['7408_3'].voltage > 0 : false;
            const colorCarry = stateCarry ? COLOR_RED : COLOR_YELLOW;
            wireList.push({ start: [1.55, 2.4, 0.75], end: [-5, 1.62, 2.2], color: colorCarry, radius: 0.08 });

        } else {
            // Full Adder Wiring:
            wireList.push({ start: [6.65, 2.4, -0.75], end: [6.65, 1.82, -3.8], color: COLOR_RED, radius: 0.08 });   // 7432 VCC
            wireList.push({ start: [9.35, 2.4, 0.75], end: [9.35, 1.82, 3.8], color: COLOR_BLACK, radius: 0.08 });   // 7432 GND

            // Trainer Switch Cin (-5.6, 6.8) -> 7486 Pin 5 & 7408 Pin 5
            wireList.push({ start: [-5.6, 1.6, 6.8], end: [-3.55, 2.4, 0.75], color: colorCin, radius: 0.08 });
            wireList.push({ start: [-3.55, 2.4, 0.75], end: [2.45, 2.4, 0.75], color: colorCin, radius: 0.08 });

            const stateS1 = pinStates['7486_3'] ? pinStates['7486_3'].voltage > 0 : false;
            const colorS1 = (tracing && stateS1) ? COLOR_RED : COLOR_YELLOW;
            wireList.push({ start: [-4.45, 2.4, 0.75], end: [-4.0, 2.4, 0.75], color: colorS1, radius: 0.07 });
            wireList.push({ start: [-4.0, 2.4, 0.75], end: [2.0, 2.4, 0.75], color: colorS1, radius: 0.07 });

            const stateSum = pinStates['7486_6'] ? pinStates['7486_6'].voltage > 0 : false;
            const colorSum = stateSum ? COLOR_RED : COLOR_YELLOW;
            wireList.push({ start: [-3.1, 2.4, 0.75], end: [-8, 1.62, 2.2], color: colorSum, radius: 0.08 });

            const stateC1 = pinStates['7408_3'] ? pinStates['7408_3'].voltage > 0 : false;
            const colorC1 = (tracing && stateC1) ? COLOR_RED : COLOR_YELLOW;
            wireList.push({ start: [1.55, 2.4, 0.75], end: [6.65, 2.4, 0.75], color: colorC1, radius: 0.07 });

            const stateC2 = pinStates['7408_6'] ? pinStates['7408_6'].voltage > 0 : false;
            const colorC2 = (tracing && stateC2) ? COLOR_RED : COLOR_YELLOW;
            wireList.push({ start: [2.90, 2.4, 0.75], end: [7.10, 2.4, 0.75], color: colorC2, radius: 0.07 });

            const stateCarry = pinStates['7432_3'] ? pinStates['7432_3'].voltage > 0 : false;
            const colorCarry = stateCarry ? COLOR_RED : COLOR_YELLOW;
            wireList.push({ start: [7.55, 2.4, 0.75], end: [-5, 1.62, 2.2], color: colorCarry, radius: 0.08 });
        }

        // Render Tubes
        wireList.forEach(w => {
            const p1 = new THREE.Vector3(...w.start);
            const p2 = new THREE.Vector3(...w.end);
            const mid = p1.clone().add(p2).multiplyScalar(0.5);
            mid.y += Math.max(1.4, p1.distanceTo(p2) * 0.22);

            const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
            const tubeGeo = new THREE.TubeGeometry(curve, 24, w.radius, 8, false);
            const tubeMat = new THREE.MeshStandardMaterial({
                color: w.color,
                roughness: 0.3,
                metalness: 0.1
            });
            const tube = new THREE.Mesh(tubeGeo, tubeMat);
            tube.castShadow = true;
            this.wireObjects.push(tube);
            this.scene.add(tube);
        });
    }

    setLEDState(key, isOn) {
        if (!this.ledObjects[key] || !this.ledLights[key]) return;

        const mat = this.ledObjects[key];
        const pLight = this.ledLights[key];

        if (isOn) {
            mat.emissive.setHex(key === 'sum' ? 0xff1a1a : 0x00ff66);
            mat.emissiveIntensity = 2.5;
            pLight.intensity = 4.0;
        } else {
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
            pLight.intensity = 0;
        }
    }

    setSwitchState(key, isOn) {
        if (this.switchObjects[key]) {
            const lever = this.switchObjects[key];
            lever.rotation.x = isOn ? Math.PI / 6 : -Math.PI / 6; // Heavy metal toggle switch lever flip
        }
    }

    setCameraPreset(preset) {
        const duration = 800;
        let targetPos = { x: 0, y: 20, z: 24 };
        let targetLookAt = { x: 0, y: 1, z: 0 };

        if (preset === 'top') {
            targetPos = { x: 0, y: 30, z: 0.1 };
        } else if (preset === 'ic_zoom') {
            targetPos = { x: 2, y: 9, z: 9 };
            targetLookAt = { x: 2, y: 1, z: 0 };
        } else if (preset === 'led_zoom') {
            targetPos = { x: -6.5, y: 6, z: 7 };
            targetLookAt = { x: -6.5, y: 1, z: 2.2 };
        }

        const startPos = this.camera.position.clone();
        const startTarget = this.controls.target.clone();
        const startTime = performance.now();

        const animateCam = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            this.camera.position.lerpVectors(startPos, new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z), ease);
            this.controls.target.lerpVectors(startTarget, new THREE.Vector3(targetLookAt.x, targetLookAt.y, targetLookAt.z), ease);
            this.controls.update();

            if (progress < 1) {
                requestAnimationFrame(animateCam);
            }
        };
        requestAnimationFrame(animateCam);
    }

    onCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactiveMeshes);

        if (intersects.length > 0) {
            const obj = intersects[0].object;
            if (obj.userData.input && window.toggleInput) {
                window.toggleInput(obj.userData.input);
            }
        }
    }

    onMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactiveMeshes);

        const tooltip = document.getElementById('pin-hover-tooltip');
        if (intersects.length > 0) {
            const obj = intersects[0].object;
            this.canvas.style.cursor = 'pointer';

            if (obj.userData.ic) {
                const pinKey = `${obj.userData.ic}_${obj.userData.pin}`;
                const info = window.appCircuit ? window.appCircuit.pinStates[pinKey] : null;
                if (info) {
                    document.getElementById('tt-title').innerText = info.name;
                    document.getElementById('tt-desc').innerText = info.label;
                    tooltip.style.left = `${event.clientX - rect.left + 15}px`;
                    tooltip.style.top = `${event.clientY - rect.top + 15}px`;
                    tooltip.style.display = 'block';
                }
            } else if (obj.userData.input) {
                document.getElementById('tt-title').innerText = `Trainer Kit Switch ${obj.userData.input}`;
                document.getElementById('tt-desc').innerText = `Click to toggle logic state (0/1)`;
                tooltip.style.left = `${event.clientX - rect.left + 15}px`;
                tooltip.style.top = `${event.clientY - rect.top + 15}px`;
                tooltip.style.display = 'block';
            }
        } else {
            this.canvas.style.cursor = 'default';
            tooltip.style.display = 'none';
        }
    }

    onWindowResize() {
        if (!this.canvas || !this.renderer) return;
        const width = this.canvas.parentElement.clientWidth;
        const height = this.canvas.parentElement.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
