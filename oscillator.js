import Pico from 'node-pico';
import { sine } from './waveforms.js';

export class Oscillator {
  constructor({
    freq = 440,
    waveform = sine,
    sampleRate = Pico.sampleRate,
  } = {}) {
    this.freq = freq;
    this.waveform = waveform;
    this.sampleRate = sampleRate;
    this.phaseLeft = 0;
    this.phaseRight = 0;
  }

  getNextSamples() {
    const samples = [
      this.waveform(this.phaseLeft),
      this.waveform(this.phaseRight),
    ];

    this.phaseLeft += this.freq / this.sampleRate;
    this.phaseRight += this.freq / this.sampleRate;

    return samples;
  }
}
