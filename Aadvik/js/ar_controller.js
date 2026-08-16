/**
 * Augmented Reality (AR) View Controller for Desktop & Mobile WebAR
 */
class ARController {
    constructor(sceneInstance) {
        this.sceneInstance = sceneInstance;
        this.arActive = false;
        this.videoElement = document.getElementById('ar-video');
        this.arOverlay = document.getElementById('ar-controls-overlay');
        this.mediaStream = null;
        this.arScale = 1.0;
    }

    async toggleARMode() {
        if (this.arActive) {
            this.stopARMode();
        } else {
            await this.startARMode();
        }
    }

    async startARMode() {
        try {
            // Request user camera video stream
            const constraints = {
                video: {
                    facingMode: 'environment', // Rear camera on mobile, default webcam on PC
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };
            this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.videoElement.srcObject = this.mediaStream;
            this.videoElement.style.display = 'block';
            this.videoElement.play();

            // Set Three.js canvas background to transparent so video is visible behind
            this.sceneInstance.scene.background = null;
            this.sceneInstance.renderer.setClearColor(0x000000, 0);

            this.arActive = true;
            this.arOverlay.style.display = 'flex';
            document.getElementById('btn-view-ar').classList.add('active');

            // Recenter camera position for AR overlay projection
            this.sceneInstance.setCameraPreset('top');

        } catch (err) {
            console.error("Camera access failed for AR mode:", err);
            alert("Could not access camera for AR mode. Please grant camera permissions or use 3D Workbench Mode.");
            this.stopARMode();
        }
    }

    stopARMode() {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }

        if (this.videoElement) {
            this.videoElement.style.display = 'none';
        }

        // Restore 3D environment background
        this.sceneInstance.scene.background = new THREE.Color(0x0c101d);
        this.sceneInstance.renderer.setClearColor(0x0c101d, 1);

        this.arActive = false;
        this.arOverlay.style.display = 'none';
        document.getElementById('btn-view-ar').classList.remove('active');
        this.sceneInstance.setCameraPreset('default');
    }

    adjustScale(factor) {
        this.arScale *= factor;
        this.arScale = Math.max(0.4, Math.min(this.arScale, 2.5));
        
        // Scale the breadboard group
        this.sceneInstance.scene.children.forEach(child => {
            if (child.type === 'Group' || child.isMesh) {
                child.scale.set(this.arScale, this.arScale, this.arScale);
            }
        });
    }

    recenterModel() {
        this.arScale = 1.0;
        this.sceneInstance.scene.children.forEach(child => {
            if (child.type === 'Group' || child.isMesh) {
                child.scale.set(1, 1, 1);
            }
        });
        this.sceneInstance.setCameraPreset('top');
    }
}
