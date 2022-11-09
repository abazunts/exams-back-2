import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class DelayMeDto {
  @Transform(({ value }) => +value * 1000, { toClassOnly: true })
  @IsInt()
  @Min(1000, { message: 'Delay must not be less than 1' })
  @Max(9000, { message: 'Delay must not be greater than 9' })
  @IsOptional()
  delay: number;
}
