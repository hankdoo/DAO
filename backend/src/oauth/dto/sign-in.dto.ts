import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDTO {
  @IsString()
  public publicAddress: string;

  @IsString()
  public publicKey: string;

  @IsNotEmpty()
  public signature: string;
}
