import { Synth } from './lib/synth.js';
import NOTES from './lib/notes.js';

const synth = new Synth();

synth.note = NOTES.A4;

synth.play();
