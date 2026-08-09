import * as THREE from 'three';

export interface ARSessionOptions {
  onSessionStart?: () => void;
  onSessionEnd?: () => void;
  onError?: (err: string) => void;
}

export class ARManager {
  private isARSupported: boolean = false;

  constructor() {
    this.checkSupport();
  }

  public async checkSupport(): Promise<boolean> {
    if (typeof navigator !== 'undefined' && 'xr' in navigator && (navigator as any).xr) {
      try {
        this.isARSupported = await (navigator as any).xr.isSessionSupported('immersive-ar');
      } catch {
        this.isARSupported = false;
      }
    } else {
      this.isARSupported = false;
    }
    return this.isARSupported;
  }

  public getIsSupported(): boolean {
    return this.isARSupported;
  }

  public async startARSession(renderer: THREE.WebGLRenderer, options: ARSessionOptions) {
    if (!('xr' in navigator) || !(navigator as any).xr) {
      if (options.onError) options.onError('WebXR AR is not supported on this device or browser.');
      return;
    }

    try {
      const session = await (navigator as any).xr.requestSession('immersive-ar', {
        requiredFeatures: ['local'],
        optionalFeatures: ['local-floor'],
      });

      renderer.xr.enabled = true;
      await renderer.xr.setSession(session);

      if (options.onSessionStart) options.onSessionStart();

      session.addEventListener('end', () => {
        renderer.xr.enabled = false;
        if (options.onSessionEnd) options.onSessionEnd();
      });
    } catch (err: any) {
      if (options.onError) options.onError(err.message || 'Failed to start WebXR AR session.');
    }
  }
}

export const arManager = new ARManager();
