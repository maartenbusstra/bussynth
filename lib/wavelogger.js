const LINE = [
  '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
  '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
];

export class WaveLogger {
  static log(value) { // -1 <-> 1
    const line = LINE.slice();
    const v = Math.floor((value * 0.5 + 0.5) * 20);
    line[v] = '*';
    console.log(`|${line.join('')}|`);
  }
}
