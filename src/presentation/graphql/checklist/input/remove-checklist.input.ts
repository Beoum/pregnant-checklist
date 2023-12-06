import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveChecklistInput {
  @Field()
  seq: number;

  @Field()
  userSeq: number;
}
