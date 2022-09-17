import { ApiProperty } from '@nestjs/swagger';
import { Cantons, Topic as TopicType } from '@prisma/client';

export class Topic implements TopicType {
  constructor(partial: Partial<Topic>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly subTitle: string | null;

  @ApiProperty()
  readonly contextImageUrl: string;

  @ApiProperty()
  readonly graphImageUrl: string;

  @ApiProperty()
  readonly body: string;

  @ApiProperty({ enum: Cantons, isArray: true })
  readonly affectedCantons: Cantons[];

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
