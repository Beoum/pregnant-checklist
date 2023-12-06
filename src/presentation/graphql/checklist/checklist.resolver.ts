import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Checklist } from '@presentation/graphql/checklist/checklist.graphql';
import { ChecklistApplication } from '@application/checklist.application';
import { CreateChecklistInput } from '@presentation/graphql/checklist/input/create-checklist.input';
import { UpdateChecklistInput } from '@presentation/graphql/checklist/input/update-checklist.input';
import { FinishChecklistInput } from '@presentation/graphql/checklist/input/finish-checklist.input';
import { RemoveChecklistInput } from '@presentation/graphql/checklist/input/remove-checklist.input';

@Resolver((of) => Checklist)
export class ChecklistResolver {
  constructor(private checklistApplication: ChecklistApplication) {}

  @Mutation(() => Checklist)
  async createChecklist(@Args('input') input: CreateChecklistInput) {
    return this.checklistApplication.create(
      input.userSeq,
      input.weekNumber,
      input.content,
    );
  }

  @Mutation(() => Checklist)
  async updateOneChecklist(@Args('input') input: UpdateChecklistInput) {
    return this.checklistApplication.update(
      input.seq,
      input.userSeq,
      input.content,
    );
  }

  @Mutation(() => Checklist, { nullable: true })
  async removeOneChecklist(@Args('input') input: RemoveChecklistInput) {
    await this.checklistApplication.remove(input.seq, input.userSeq);
  }

  @Mutation(() => Checklist)
  async finishBySeq(@Args('input') input: FinishChecklistInput) {
    return this.checklistApplication.finish(input.seq, input.userSeq);
  }

  @Mutation(() => Checklist)
  async unfinishBySeq(@Args('input') input: FinishChecklistInput) {
    return this.checklistApplication.unfinish(input.seq, input.userSeq);
  }
}
