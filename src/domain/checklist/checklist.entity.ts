import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import IllegalArgumentException from '@exception/illegal-argument.exception';

@Entity()
export class Checklist {
  @PrimaryGeneratedColumn()
  readonly seq: number; // 고유번호

  @Column()
  userSeq: number; // 유저 고유번호

  @Column()
  weekNumber: number; // 임신 주차

  @Column()
  content: string; // 내용

  @Column()
  complete: boolean; // 완료 여부

  static create(
    userSeq: number,
    weekNumber: number,
    content: string,
  ): Checklist {
    if (typeof userSeq !== 'number') {
      throw new IllegalArgumentException('check userSeq');
    }
    if (typeof weekNumber !== 'number' || weekNumber < 0 || weekNumber > 40) {
      throw new IllegalArgumentException('check weekNumber');
    }
    if (typeof content !== 'string' || content.length === 0) {
      throw new IllegalArgumentException('check content');
    }
    const checklist = new Checklist();
    checklist.userSeq = userSeq;
    checklist.weekNumber = weekNumber;
    checklist.content = content;
    checklist.complete = false;
    return checklist;
  }

  isComplete(): boolean {
    return this.complete;
  }

  finish(): void {
    this.complete = true;
  }

  unfinish(): void {
    this.complete = false;
  }
}
