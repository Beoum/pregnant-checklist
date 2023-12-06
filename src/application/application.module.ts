import { Module } from '@nestjs/common';
import { ChecklistModule } from '@domain/checklist/checklist.module';
import { UserModule } from '@domain/user/user.module';
import { ChecklistApplication } from './checklist.application';
import { UserApplication } from './user.application';

@Module({
  imports: [ChecklistModule, UserModule],
  providers: [ChecklistApplication, UserApplication],
  exports: [ChecklistApplication, UserApplication],
})
export class ApplicationModule {}
