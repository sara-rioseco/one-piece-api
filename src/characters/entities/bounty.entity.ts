import { IsBoolean, IsNotEmpty, IsPositive } from "class-validator";

export class Bounty {
  @IsNotEmpty()
  @IsPositive()
  amt: number;
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}