import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => Int, { description: 'User unique key' })
  seq: number;

  @Field({ description: 'User nickname' })
  nickname: string;

  @Field({ description: '"Expected due date' })
  dueDate: string;
}
