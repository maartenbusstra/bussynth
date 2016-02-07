"use strict";

import Pico from 'node-pico';
import { Oscillator } from './oscillator.js';
import { square } from './waveforms.js';
import NOTES from './notes.js';

function tone(oscs) {
  return function fillBuffer(e) {
    const out = e.buffers;

    for (let i = 0; i < e.bufferSize; i++) {
      const samples = oscs.map(osc => osc.getNextSamples())
      const [L, R] = mixer(samples);

      out[0][i] = L;
      out[1][i] = R;
    }

  };
}

function mixer(channels, {
  master = 1,
} = {}) {
  let [L, R] = channels.reduce((x, y) => [x[0] + y[0], x[1] + y[1]]);
  L = L / channels.length;
  R = R / channels.length;

  return [L * master, R * master];
}


Pico.play(tone([
  new Oscillator({
    freq: 880,
    waveform: square,
  }),
  new Oscillator({
    freq: 440,
    waveform: square,
  })
]));


// ,
// {
//   freq: 622.25,
//   waveform: square,
// },
// {
//   freq: 783.99,
//   waveform: square,
// },
// {
//   freq: 130.81,
//   waveform: sine,
// }
