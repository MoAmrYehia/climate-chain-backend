import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TopicInstancesModule } from './topic-instances/topic-instances.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true, envFilePath: ['.env.local', '.env'] }),
    TopicsModule,
    TopicInstancesModule
  ]
})
export class AppModule {}
