import { Checklist } from '@domain/checklist/checklist.entity';

export default class ChecklistFixture {
  private userSeq = 1;
  private weekNumber = 1;
  private content = 'Study about symptoms of ovulation';

  withUserSeq(userSeq: number): ChecklistFixture {
    this.userSeq = userSeq;
    return this;
  }

  withWeekNumber(weekNumber: number): ChecklistFixture {
    this.weekNumber = weekNumber;
    return this;
  }

  withContent(content: string): ChecklistFixture {
    this.content = content;
    return this;
  }

  build(): Checklist {
    return Checklist.create(this.userSeq, this.weekNumber, this.content);
  }
}
