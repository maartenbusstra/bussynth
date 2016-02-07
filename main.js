import { Synth } from './lib/synth.js';
import { Sequencer } from './lib/sequencer.js';

import NOTES from './lib/notes.js';

const synth = new Synth();

const seq = new Sequencer({
  synth,
  sequence: [
    NOTES.C3, NOTES.DS3, NOTES.G3, NOTES.AS3,
    NOTES.C3, NOTES.DS3, NOTES.G3, NOTES.AS3,
    NOTES.C3, NOTES.DS3, NOTES.G3, NOTES.AS3,
    NOTES.C3, NOTES.DS3, NOTES.G3, NOTES.AS3,
    NOTES.C3, NOTES.DS3, NOTES.G3, NOTES.AS3,
    NOTES.C3, NOTES.DS3, NOTES.G3, NOTES.AS3,
    NOTES.C3, NOTES.DS3, NOTES.G3, NOTES.AS3,
    NOTES.C3, NOTES.DS3, NOTES.G3, NOTES.AS3,
  ],
});

seq.start();
