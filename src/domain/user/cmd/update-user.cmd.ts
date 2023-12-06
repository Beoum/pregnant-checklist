import IllegalArgumentException from '@exception/illegal-argument.exception';
import DateUtil from '@util/date.util';

export class UpdateUserCmd {
  readonly seq: number;
  readonly nickname: string;
  readonly dueDate: string;

  constructor(seq: number, nickname: string, dueDate: string) {
    if (typeof seq !== 'number') {
      throw new IllegalArgumentException('check seq');
    }
    if (nickname && (typeof nickname !== 'string' || nickname.length === 0)) {
      throw new IllegalArgumentException('check nickname');
    }
    if (dueDate && !DateUtil.validateDateWithFormat(dueDate)) {
      throw new IllegalArgumentException('check dueDate');
    }
    this.seq = seq;
    this.nickname = nickname;
    this.dueDate = dueDate;
  }
}
