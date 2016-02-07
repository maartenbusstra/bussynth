import Pico from 'node-pico';
import { Oscillator } from './lib/oscillator.js';
import { Mixer } from './mixer.js';
import {
  square,
  sine,
  triangle,
  sawtooth,
} from './lib/waveforms.js';
import NOTES from './lib/notes.js';

export class Synth {
  constructor() {
    this.oscMixer = new Mixer();
    this.oscA = new Oscillator({ waveform: square });
    this.oscB = new Oscillator({ waveform: square });
    this.oscC = new Oscillator({ waveform: square });
  }

  set note(freq) {
    this.oscA.freq = freq;
    this.oscB.freq = freq;
    this.oscC.freq = freq;
  }

  getNextSamples() {
    this.oscMixer.setChannelSamples(0, this.oscA.getNextSamples());
    this.oscMixer.setChannelSamples(1, this.oscA.getNextSamples());
    this.oscMixer.setChannelSamples(2, this.oscA.getNextSamples());
    return this.oscMixer.getMasterSamples();
  }

  play() {
    Pico.play(this._tone());
  }

  stop() {
    Pico.stop();
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
