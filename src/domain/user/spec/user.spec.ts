import IllegalArgumentException from '@exception/illegal-argument.exception';
import UserFixture from '@domain/user/spec/user.spec.fixture';
import DateUtil from '@util/date.util';

describe('User Entity Test', () => {
  it('User의 nickname이 string이 아니면 에러가 발생한다', () => {
    expect(() => {
      new UserFixture().withNickname(null).build();
    }).toThrowError(IllegalArgumentException);
  });

  it('User의 nickname의 길이가 0이라면 에러가 발생한다', () => {
    expect(() => {
      new UserFixture().withNickname('').build();
    }).toThrowError(IllegalArgumentException);
  });

  it('User의 dueDate가 string이 아니면 에러가 발생한다', () => {
    expect(() => {
      new UserFixture().withDueDate(null).build();
    }).toThrowError(IllegalArgumentException);
  });

  it('User의 dueDate의 format이 다르면 에러가 발생한다', () => {
    expect(() => {
      new UserFixture().withDueDate('2023/13/11').build();
    }).toThrowError(IllegalArgumentException);
  });

  it('User의 현재 임신주차를 반환한다', () => {
    const currentDate = DateUtil.getCurrentDate();
    const user = new UserFixture().withDueDate(currentDate).build();
    const pregnancyWeeks = user.getPregnancyWeeks();
    expect(pregnancyWeeks).toEqual(0);
  });
});
