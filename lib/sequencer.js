
export class Sequencer {
  constructor({
    synth,
    bpm = 100,
    sequence = [],
  } = {}) {
    this.synth = synth;
    this.bpm = bpm;
    this.sequence = sequence;
    this.currentNote = 0;
  }

  start() {
    this.synth.play();
    return this._loop();
  }

  stop() {
    this.synth.stop();
  }

  _playNextNote() {
    const nextNote = this.sequence[this.currentNote % this.sequence.length];
    this.synth.note = nextNote;
    this.currentNote++;
  }

  _loop() {
    const msPerNote = 1 / this.bpm * 60 * 1000;
    let stop = false;
    let start = Date.now();
    let now;
    this._playNextNote();
    const interval = setInterval(() => {
      if (stop) clearInterval(interval);
      now = Date.now();
      if ((now - start) > msPerNote) {
        this._playNextNote();
        start = Date.now();
      }
    }, 0);

    return () => (stop = true);
  }
}
