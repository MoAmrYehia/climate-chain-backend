import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { BaseFilterDto, getOrderByArrayFromType, stringArrayToEnum } from '../../misc/filtering';
import { CreateTopicDto } from './create-topic.dto';

export class FilterTopicsDto extends IntersectionType(PartialType(CreateTopicDto), BaseFilterDto) {
  @ApiProperty({
    required: false,
    enum: stringArrayToEnum(getOrderByArrayFromType(Prisma.TopicScalarFieldEnum))
  })
  @IsOptional()
  @IsString()
  @ValidateIf((obj, val) => getOrderByArrayFromType(Prisma.TopicScalarFieldEnum).includes(val))
  readonly orderBy?: string = 'updatedAt';
}
