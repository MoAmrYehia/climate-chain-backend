import { ApiProperty } from '@nestjs/swagger';
import { Prisma, TreeKind } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

type ICreateTreeDto = Omit<Prisma.TreeCreateInput, 'id' | 'createdAt' | 'updatedAt' | 'versions'>;

export class CreateTreeDto implements ICreateTreeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  readonly age: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TreeKind)
  @ApiProperty({ enum: TreeKind })
  readonly kind: TreeKind;
}
