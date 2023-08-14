import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetMessageDTO {
  @IsString()
  public publicAddress: string;
}
