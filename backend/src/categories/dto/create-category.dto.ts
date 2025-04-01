import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Title of the category',
    example: 'Electronics',
    required: true,
  })
  @IsNotEmpty({
    message: 'Title can not be empty.',
  })
  @IsString({
    message: 'Title should be string.',
  })
  title: string;

  @ApiProperty({
    description:
      'Detailed description of the category',
    example:
      'Devices and gadgets including smartphones, laptops, and accessories',
    required: true,
  })
  @IsNotEmpty({
    message: 'Description can not be empty.',
  })
  @IsString({
    message: 'Description should be string.',
  })
  description: string;
}
