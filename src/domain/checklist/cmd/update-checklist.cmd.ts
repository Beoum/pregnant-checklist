import IllegalArgumentException from '@exception/illegal-argument.exception';

export class UpdateChecklistCmd {
  readonly seq: number;
  readonly userSeq: number;
  readonly content: string;
  constructor(seq: number, userSeq: number, content: string) {
    if (typeof seq !== 'number') {
      throw new IllegalArgumentException('check seq');
    }
    if (typeof userSeq !== 'number') {
      throw new IllegalArgumentException('check userSeq');
    }
    if (typeof content !== 'string' || content.length === 0) {
      throw new IllegalArgumentException('check content');
    }
    this.seq = seq;
    this.userSeq = userSeq;
    this.content = content;
  }
}
