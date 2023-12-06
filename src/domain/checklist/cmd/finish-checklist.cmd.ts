import IllegalArgumentException from '@exception/illegal-argument.exception';

export class FinishChecklistCmd {
  readonly seq: number;
  readonly userSeq: number;

  constructor(seq: number, userSeq: number) {
    if (typeof seq !== 'number') {
      throw new IllegalArgumentException('check seq');
    }
    if (typeof userSeq !== 'number') {
      throw new IllegalArgumentException('check userSeq');
    }
    this.seq = seq;
    this.userSeq = userSeq;
  }
}
