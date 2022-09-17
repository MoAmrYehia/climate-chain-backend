import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { AuthzModule } from '../authz/authz.module';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  imports: [AuthzModule, PrismaModule],
  controllers: [TopicsController],
  providers: [TopicsService]
})
export class TopicsModule {}
