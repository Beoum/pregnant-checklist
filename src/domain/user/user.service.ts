import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@domain/user/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserCmd } from '@domain/user/cmd/update-user.cmd';
import NotFoundException from '@exception/not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async update(cmd: UpdateUserCmd): Promise<User> {
    const user = await this.findOrThrow({ seq: cmd.seq });

    if (cmd.nickname) user.nickname = cmd.nickname;
    if (cmd.dueDate) user.dueDate = cmd.dueDate;

    return this.userRepository.save(user);
  }

  async findOrThrow(query: { seq: number }): Promise<User> {
    const user = await this.userRepository.findOneBy(query);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
