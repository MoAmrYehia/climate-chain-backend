import { ApiProperty } from '@nestjs/swagger';
import { Cantons, Prisma } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

type ICreateTopicDto = Omit<Prisma.TopicCreateInput, 'id' | 'createdAt' | 'updatedAt' | 'versions'>;

export class CreateTopicDto implements ICreateTopicDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly subTitle?: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty()
  readonly contextImageUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty()
  readonly graphImageUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly body: string;

  @IsOptional()
  @IsString({ each: true })
  @IsEnum(Cantons, { each: true })
  @ApiProperty({ enum: Cantons, isArray: true })
  readonly affectedCantons?: Cantons[];
}
