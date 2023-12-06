import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateChecklistInput {
  @Field()
  seq: number;

  @Field()
  userSeq: number;

  @Field()
  content: string;
}
