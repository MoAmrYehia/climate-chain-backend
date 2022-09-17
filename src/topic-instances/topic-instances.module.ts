import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { AuthzModule } from '../authz/authz.module';
import { TopicInstancesController } from './topic-instances.controller';
import { TopicInstancesService } from './topic-instances.service';

@Module({
  imports: [AuthzModule, PrismaModule],
  controllers: [TopicInstancesController],
  providers: [TopicInstancesService]
})
export class TopicInstancesModule {}
