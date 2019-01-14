import { IsString } from 'class-validator';

export class IndustryDTO {

  @IsString()
  name: string;

}
