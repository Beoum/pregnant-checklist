import { Injectable } from '@nestjs/common';
import { ChecklistService } from '@domain/checklist/checklist.service';
import { CreateChecklistCmd } from '@domain/checklist/cmd/create-checklist.cmd';
import { UpdateChecklistCmd } from '@domain/checklist/cmd/update-checklist.cmd';
import { FinishChecklistCmd } from '@domain/checklist/cmd/finish-checklist.cmd';
import { RemoveChecklistCmd } from '@domain/checklist/cmd/remove-checklist.cmd';
import { Checklist } from '@domain/checklist/checklist.entity';
import { UserService } from '@domain/user/user.service';

@Injectable()
export class ChecklistApplication {
  constructor(
    private checklistService: ChecklistService,
    private userService: UserService,
  ) {}

  async create(
    userSeq: number,
    weekNumber,
    content: string,
  ): Promise<Checklist> {
    await this.userService.findOrThrow({ seq: userSeq });
    return this.checklistService.create(
      new CreateChecklistCmd(userSeq, weekNumber, content),
    );
  }

  async update(
    seq: number,
    userSeq: number,
    content: string,
  ): Promise<Checklist> {
    return this.checklistService.update(
      new UpdateChecklistCmd(seq, userSeq, content),
    );
  }

  async remove(seq: number, userSeq: number): Promise<void> {
    await this.checklistService.remove(new RemoveChecklistCmd(seq, userSeq));
  }

  async finish(seq: number, userSeq: number): Promise<Checklist> {
    return this.checklistService.finish(new FinishChecklistCmd(seq, userSeq));
  }

  async unfinish(seq: number, userSeq: number): Promise<Checklist> {
    return this.checklistService.unfinish(new FinishChecklistCmd(seq, userSeq));
  }
}
