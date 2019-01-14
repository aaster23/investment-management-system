import { IsString } from 'class-validator';

export class IndustryUpdateDTO {

  @IsString()
  id: string;

  @IsString()
  name: string;

}
