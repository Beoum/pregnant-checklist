import { Module } from '@nestjs/common';
import { UserResolver } from '@presentation/graphql/user/user.resolver';
import { ApplicationModule } from '@application/application.module';
import { ChecklistResolver } from '@presentation/graphql/checklist/checklist.resolver';

@Module({
  imports: [ApplicationModule],
  providers: [UserResolver, ChecklistResolver],
})
export class GraphqlModule {}
