import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import IllegalArgumentException from '@exception/illegal-argument.exception';
import DateUtil from '@util/date.util';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly seq: number; // 고유번호

  @Column()
  nickname: string; // 이름

  @Column({ type: 'date' })
  dueDate: string; // 출산 예정일 (YYYY-MM-DD 형식)

  static create(nickname: string, dueDate: string): User {
    if (typeof nickname !== 'string' || nickname.length === 0) {
      throw new IllegalArgumentException('check nickname');
    }
    if (!DateUtil.validateDateWithFormat(dueDate)) {
      throw new IllegalArgumentException('check dueDate');
    }
    const user = new this();
    user.nickname = nickname;
    user.dueDate = dueDate;
    return user;
  }

  getPregnancyWeeks(): number {
    return DateUtil.getDiffWeeksWithCurrent(this.dueDate);
  }
}
