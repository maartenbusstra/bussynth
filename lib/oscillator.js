import Pico from 'node-pico';
import { sine } from './waveforms.js';

export class Oscillator {
  constructor({
    freq = 440,
    waveform = sine,
    sampleRate = Pico.sampleRate,
  } = {}) {
    this._freq = freq;
    this.waveform = waveform;
    this.sampleRate = sampleRate;
    this.phaseLeft = 0;
    this.phaseRight = 0;
  }

  get freq() {
    return this._freq;
  }

  set freq(freq) {
    this._freq = freq;
    this.phaseLeft = 0;
    this.phaseRight = 0;
  }

  getNextSamples() {
    const samples = [
      this.waveform(this.phaseLeft),
      this.waveform(this.phaseRight),
    ];

    this.phaseLeft += this._freq / this.sampleRate;
    this.phaseRight += this._freq / this.sampleRate;

    return samples;
  }
}
