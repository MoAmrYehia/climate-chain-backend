import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { BaseFilterDto, getOrderByArrayFromType, stringArrayToEnum } from '../../misc/filtering';
import { CreateTreeDto } from './create-tree.dto';

export class FilterTrees extends IntersectionType(PartialType(CreateTreeDto), BaseFilterDto) {
  @ApiProperty({
    required: false,
    enum: stringArrayToEnum(getOrderByArrayFromType(Prisma.TreeScalarFieldEnum))
  })
  @IsOptional()
  @IsString()
  @ValidateIf((obj, val) => getOrderByArrayFromType(Prisma.TreeScalarFieldEnum).includes(val))
  readonly orderBy?: string = 'updatedAt';
}
