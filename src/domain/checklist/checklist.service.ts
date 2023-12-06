import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Checklist } from '@domain/checklist/checklist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import NotFoundException from '@exception/not-found.exception';
import IllegalStateException from '@exception/illegal-state.exception';
import { CreateChecklistCmd } from '@domain/checklist/cmd/create-checklist.cmd';
import { UpdateChecklistCmd } from '@domain/checklist/cmd/update-checklist.cmd';
import { FinishChecklistCmd } from '@domain/checklist/cmd/finish-checklist.cmd';
import { RemoveChecklistCmd } from '@domain/checklist/cmd/remove-checklist.cmd';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(Checklist)
    private checklistRepository: Repository<Checklist>,
  ) {}

  async create(cmd: CreateChecklistCmd): Promise<Checklist> {
    const checklist = Checklist.create(
      cmd.userSeq,
      cmd.weekNumber,
      cmd.content,
    );
    return this.checklistRepository.save(checklist);
  }
  async update(cmd: UpdateChecklistCmd): Promise<Checklist> {
    const checklist = await this.findOneByOrThrow({
      seq: cmd.seq,
      userSeq: cmd.userSeq,
    });
    checklist.content = cmd.content;
    return this.checklistRepository.save(checklist);
  }

  async remove(cmd: RemoveChecklistCmd): Promise<void> {
    const checklist = await this.findOneByOrThrow({
      seq: cmd.seq,
      userSeq: cmd.userSeq,
    });
    await this.checklistRepository.remove(checklist);
  }

  async finish(cmd: FinishChecklistCmd): Promise<Checklist> {
    const checklist = await this.findOneByOrThrow({
      seq: cmd.seq,
      userSeq: cmd.userSeq,
    });
    if (checklist.isComplete()) {
      throw new IllegalStateException('already complete');
    }

    checklist.finish();

    return this.checklistRepository.save(checklist);
  }

  async unfinish(cmd: FinishChecklistCmd): Promise<Checklist> {
    const checklist = await this.findOneByOrThrow({
      seq: cmd.seq,
      userSeq: cmd.userSeq,
    });
    if (!checklist.isComplete()) {
      throw new IllegalStateException('already incomplete');
    }

    checklist.unfinish();

    return this.checklistRepository.save(checklist);
  }

  private async findOneByOrThrow(query: {
    seq?: number;
    userSeq?: number;
  }): Promise<Checklist> {
    const checklist = await this.checklistRepository.findOneBy(query);
    if (!checklist) {
      throw new NotFoundException('checklist is not found');
    }
    return checklist;
  }
}
