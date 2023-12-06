import { Injectable } from '@nestjs/common';
import { UserService } from '@domain/user/user.service';
import { UpdateUserCmd } from '@domain/user/cmd/update-user.cmd';
import { User } from '@domain/user/user.entity';

@Injectable()
export class UserApplication {
  constructor(private userService: UserService) {}

  async findOne(seq: number): Promise<User> {
    return this.userService.findOrThrow({ seq });
  }

  async update(seq: number, nickname: string, dueDate: string): Promise<User> {
    return this.userService.update(new UpdateUserCmd(seq, nickname, dueDate));
  }
}
