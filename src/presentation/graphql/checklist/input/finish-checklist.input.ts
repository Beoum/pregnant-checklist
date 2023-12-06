import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FinishChecklistInput {
  @Field()
  seq: number;

  @Field()
  userSeq: number;
}
