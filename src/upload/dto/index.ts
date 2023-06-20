/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class SampleDto {
  @IsNotEmpty()
  name: string;
}
