import { Module } from '@nestjs/common';
import { ChecklistService } from '@domain/checklist/checklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checklist } from '@domain/checklist/checklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checklist])],
  providers: [ChecklistService],
  exports: [ChecklistService],
})
export class ChecklistModule {}
