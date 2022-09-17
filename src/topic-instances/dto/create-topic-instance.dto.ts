import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Years } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

type ICreateTopicInstanceDto = Omit<Prisma.TopicInstanceCreateInput, 'id' | 'createdAt' | 'updatedAt' | 'topic'>;

export class CreateTopicInstanceDto implements ICreateTopicInstanceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly value: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly unit: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  readonly difference: number;

  @IsNotEmpty()
  @IsEnum(Years)
  @ApiProperty()
  readonly year: Years;
}
