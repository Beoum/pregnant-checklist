import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  seq: number;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  dueDate?: string;
}
