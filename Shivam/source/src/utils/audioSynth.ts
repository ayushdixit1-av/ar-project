class ElectronicsAudioEngine {
  private ctx: AudioContext | null = null;
  private buzzerOsc: OscillatorNode | null = null;
  private buzzerGain: GainNode | null = null;
  private motorOsc: OscillatorNode | null = null;
  private motorGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playPowerClick(isPowerOn: boolean) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isPowerOn ? 800 : 400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isPowerOn ? 1200 : 200, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      console.warn('Audio click error', e);
    }
  }

  public playSwitchClick(isOn: boolean) {
    this.playPowerClick(isOn);
  }

  public setBuzzerTone(freqHz: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      if (freqHz <= 0) {
        if (this.buzzerOsc) {
          this.buzzerOsc.stop();
          this.buzzerOsc.disconnect();
          this.buzzerOsc = null;
        }
        return;
      }

      if (!this.buzzerOsc) {
        this.buzzerOsc = this.ctx.createOscillator();
        this.buzzerGain = this.ctx.createGain();

        this.buzzerOsc.type = 'square';
        this.buzzerOsc.frequency.setValueAtTime(freqHz, this.ctx.currentTime);

        this.buzzerGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

        this.buzzerOsc.connect(this.buzzerGain);
        this.buzzerGain.connect(this.ctx.destination);

        this.buzzerOsc.start();
      } else {
        this.buzzerOsc.frequency.setValueAtTime(freqHz, this.ctx.currentTime);
      }
    } catch (e) {
      console.warn('Audio buzzer error', e);
    }
  }

  public playServoSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(320, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      console.warn('Servo sound error', e);
    }
  }

  public setDCMotorHum(rpm: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      if (rpm <= 0) {
        if (this.motorOsc) {
          this.motorOsc.stop();
          this.motorOsc.disconnect();
          this.motorOsc = null;
        }
        return;
      }

      const pitch = 60 + (rpm / 3000) * 120;
      if (!this.motorOsc) {
        this.motorOsc = this.ctx.createOscillator();
        this.motorGain = this.ctx.createGain();

        this.motorOsc.type = 'sawtooth';
        this.motorOsc.frequency.setValueAtTime(pitch, this.ctx.currentTime);

        this.motorGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

        this.motorOsc.connect(this.motorGain);
        this.motorGain.connect(this.ctx.destination);

        this.motorOsc.start();
      } else {
        this.motorOsc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      }
    } catch (e) {
      console.warn('Motor hum error', e);
    }
  }

  public playChime(isSuccess: boolean) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isSuccess ? 'triangle' : 'sawtooth';
      if (isSuccess) {
        osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.2); // G5
      } else {
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(150, this.ctx.currentTime + 0.25);
      }

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {
      console.warn('Chime error', e);
    }
  }
}

export const audioSynth = new ElectronicsAudioEngine();
