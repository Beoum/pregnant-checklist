import { User } from '@domain/user/user.entity';

export default class UserFixture {
  private nickname = 'user';
  private dueDate = '2023-01-11';

  withNickname(nickname: string): UserFixture {
    this.nickname = nickname;
    return this;
  }

  withDueDate(dueDate: string): UserFixture {
    this.dueDate = dueDate;
    return this;
  }

  build(): User {
    return User.create(this.nickname, this.dueDate);
  }
}
