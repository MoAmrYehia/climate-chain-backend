import { PartialType } from '@nestjs/swagger';
import { CreateTopicInstanceDto } from './create-topic-instance.dto';

export class UpdateTopicInstanceDto extends PartialType(CreateTopicInstanceDto) {}
