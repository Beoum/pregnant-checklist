import ChecklistFixture from '@domain/checklist/spec/checklist.spec.fixture';
import IllegalArgumentException from '@exception/illegal-argument.exception';

describe('Checklist Entity Test', () => {
  it('userSeq는 number가 아니면 에러가 발생한다', () => {
    expect(() => {
      new ChecklistFixture().withUserSeq(null).build();
    }).toThrowError(IllegalArgumentException);
  });

  it('weekNumber는 number가 아니면 에러가 발생한다', () => {
    expect(() => {
      new ChecklistFixture().withWeekNumber(null).build();
    }).toThrowError(IllegalArgumentException);
  });

  it('weekNumber가 0보다 작으면 에러가 발생한다', () => {
    expect(() => {
      new ChecklistFixture().withWeekNumber(-1).build();
    }).toThrowError(IllegalArgumentException);
  });

  it('weekNumber가 40보다 크면 에러가 발생한다', () => {
    expect(() => {
      new ChecklistFixture().withWeekNumber(41).build();
    }).toThrowError(IllegalArgumentException);
  });

  it('content가 string이 아니면 에러가 발생한다', () => {
    expect(() => {
      new ChecklistFixture().withContent(null).build();
    }).toThrowError(IllegalArgumentException);
  });

  it('content의 길이가 0이면 아니면 에러가 발생한다', () => {
    expect(() => {
      new ChecklistFixture().withContent('').build();
    }).toThrowError(IllegalArgumentException);
  });

  it('finish()를 호출하면 완료처리 된다', () => {
    const checklist = new ChecklistFixture().build();
    checklist.finish();
    expect(checklist.complete).toEqual(true);
  });

  it('unfinish()를 호출하면 미완료처리 된다', () => {
    const checklist = new ChecklistFixture().build();
    checklist.finish();
    checklist.unfinish();
    expect(checklist.complete).toEqual(false);
  });
});
