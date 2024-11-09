import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSeriesDto {
  @ApiProperty()
    @IsNotEmpty({ message: 'El campo titulo es obligatorio' })
    @IsString({ message: 'El campo titulo debe ser de tipo cadena' })
    readonly titulo: string;

  @ApiProperty()
    @IsNotEmpty({ message: 'El campo sinopsis es obligatorio' })
    @IsString({ message: 'El campo sinopsis debe ser de tipo cadena' })
    @MaxLength(5000, {
        message: 'El campo sinopsis no debe ser mayor a 5000 caracteres',
      })
    readonly sinopsis: string;

  @ApiProperty()
    @IsNotEmpty({ message: 'El campo director es obligatorio' })
    @IsString({ message: 'El campo director debe ser de tipo cadena' })
    readonly director: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo temporadas es obligatorio' })
  @IsInt({ message: 'El campo temporadas debe ser un número entero' })
    readonly temporadas: number;

    // @ApiProperty()
    // @IsNotEmpty({ message: 'El campo tipo clasificacion es obligatorio' })
    // @IsString({ message: 'El campo tipo clasificacion debe ser de tipo cadena' })
    //   readonly tipoClasificacion: string;

  @ApiProperty()
    @IsDefined({ message: 'El campo fechaEstreno debe estar definido' })
    @IsDateString({}, { message: 'El campo fechaEstreno debe ser de tipo fecha' })
    readonly fechaEstreno: Date;
}
