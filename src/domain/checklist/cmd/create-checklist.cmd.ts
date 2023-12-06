import IllegalArgumentException from '@exception/illegal-argument.exception';

export class CreateChecklistCmd {
  readonly userSeq: number;
  readonly weekNumber: number;
  readonly content: string;
  constructor(userSeq: number, weekNumber: number, content: string) {
    if (typeof userSeq !== 'number') {
      throw new IllegalArgumentException('check userSeq');
    }
    if (typeof weekNumber !== 'number') {
      throw new IllegalArgumentException('check weekNumber');
    }
    if (typeof content !== 'string' || content.length === 0) {
      throw new IllegalArgumentException('check content');
    }
    this.userSeq = userSeq;
    this.weekNumber = weekNumber;
    this.content = content;
  }
}
