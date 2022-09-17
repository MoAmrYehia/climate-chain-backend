import { ApiProperty } from '@nestjs/swagger';
import { TopicInstance as TopicInstanceType, Years } from '@prisma/client';

export class TopicInstance implements TopicInstanceType {
  constructor(partial: Partial<TopicInstance>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly value: number;

  @ApiProperty()
  readonly unit: string;

  @ApiProperty()
  readonly difference: number;

  @ApiProperty()
  readonly year: Years;

  @ApiProperty()
  readonly topicId: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
