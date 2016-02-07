import { WaveLogger } from './wavelogger.js';

export class Mixer {
  constructor({
    masterLevel = 1,
    logWaveform = false,
  } = {}) {
    this.logWaveform = logWaveform;
    this.masterLevel = masterLevel;
    this.channels = [
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }

  setChannelSamples(channel, samples) {
    this.channels[channel] = samples;
  }

  getMasterSamples() {
    const nOfChannels = this.channels.length;
    const [L, R] = this.channels.reduce((x, y) => [x[0] + y[0], x[1] + y[1]]);
    const res = [
      L / nOfChannels * this.masterLevel,
      R / nOfChannels * this.masterLevel,
    ];
    if (this.logWaveform) WaveLogger.log(res[0]);
    return res;
  }
}
