import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { BaseFilterDto, getOrderByArrayFromType, stringArrayToEnum } from '../../misc/filtering';
import { CreateTopicInstanceDto } from './create-topic-instance.dto';

export class FilterTopicInstancesDto extends IntersectionType(PartialType(CreateTopicInstanceDto), BaseFilterDto) {
  @ApiProperty({
    required: false,
    enum: stringArrayToEnum(getOrderByArrayFromType(Prisma.TopicInstanceScalarFieldEnum))
  })
  @IsOptional()
  @IsString()
  @ValidateIf((obj, val) => getOrderByArrayFromType(Prisma.TopicInstanceScalarFieldEnum).includes(val))
  readonly orderBy?: string = 'updatedAt';
}
