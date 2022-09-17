import { ApiProperty } from '@nestjs/swagger';
import { Tree as TreeType, TreeKind } from '@prisma/client';

export class Tree implements TreeType {
  constructor(partial: Partial<Tree>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ enum: TreeKind })
  readonly kind: TreeKind;

  @ApiProperty()
  readonly age: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
