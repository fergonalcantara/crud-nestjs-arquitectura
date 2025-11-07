import { IsString, IsEmail, IsInt, IsNotEmpty, Length, Min, Max } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  telefono: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  direccion: string;

  @IsInt()
  @Min(1)
  @Max(120)
  edad: number;
}