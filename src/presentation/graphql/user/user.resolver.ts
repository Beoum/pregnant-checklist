import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@presentation/graphql/user/user.graphql';
import { UserApplication } from '@application/user.application';
import { UpdateUserInput } from '@presentation/graphql/user/input/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private userApplication: UserApplication) {}

  @Query(() => User)
  async getOneUser(@Args('seq', { type: () => Int }) seq: number) {
    return this.userApplication.findOne(seq);
  }

  @Mutation(() => User)
  async updateOneUser(@Args('input') input: UpdateUserInput) {
    return this.userApplication.update(
      input.seq,
      input.nickname,
      input.dueDate,
    );
  }
}
