import { IsString, IsInt, IsNotEmpty, Length, Min, Max } from 'class-validator';

export class CreateCarroDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  marca: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  modelo: string;

  @IsInt()
  @Min(1900)
  @Max(2030)
  anio: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  color: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  placa: string;
}