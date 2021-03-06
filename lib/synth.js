import Pico from 'node-pico';
import { Oscillator } from './oscillator.js';
import { Mixer } from './mixer.js';
import {
  square,
  sine,
  triangle,
  sawtooth,
} from './waveforms.js';

export class Synth {
  constructor({
    logWaveform = false,
    sampleRate = Pico.sampleRate,
  } = {}) {
    this.oscMixer = new Mixer({ masterLevel: 0.5, logWaveform });

    this.oscA = new Oscillator({ waveform: square, sampleRate });
    this.oscB = new Oscillator({ waveform: square, sampleRate });
    this.oscC = new Oscillator({ waveform: square, sampleRate });
  }

  set note(freq) {
    this.oscA.freq = freq;
    this.oscB.freq = freq;
    this.oscC.freq = freq;
  }

  getNextSamples() {
    this.oscMixer.setChannelSamples(0, this.oscA.getNextSamples());
    this.oscMixer.setChannelSamples(1, this.oscB.getNextSamples());
    this.oscMixer.setChannelSamples(2, this.oscC.getNextSamples());
    return this.oscMixer.getMasterSamples();
  }

  play() {
    Pico.play(this._tone());
  }

  stop() {
    Pico.pause();
  }

  _tone() {
    return e => {
      const out = e.buffers;
      for (let i = 0; i < e.bufferSize; i++) {
        const [L, R] = this.getNextSamples();
        out[0][i] = L;
        out[1][i] = R;
      }
    };
  }
}
