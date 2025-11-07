import { IsString, IsInt, IsNotEmpty, Length, Min, Max } from 'class-validator';

export class CreateMascotaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  especie: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  raza: string;

  @IsInt()
  @Min(0)
  @Max(50)
  edad: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  color: string;
}