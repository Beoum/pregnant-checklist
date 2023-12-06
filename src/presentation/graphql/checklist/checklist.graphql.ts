import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Checklist {
  @Field({ description: 'checklist unique key' })
  seq: number;

  @Field({ description: 'user unique key' })
  userSeq: number;

  @Field({ description: 'weeks of pregnancy' })
  weekNumber: number;

  @Field()
  content: string;

  @Field()
  complete: boolean;
}
