import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CarrosService } from './carros.service';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('archivo_texto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `texto-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(txt)$/)) {
          return callback(new BadRequestException('Solo se permiten archivos de texto (.txt)'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  create(@Body() createCarroDto: CreateCarroDto, @UploadedFile() file?: Express.Multer.File) {
    return this.carrosService.create(createCarroDto, file);
  }

  @Get()
  findAll() {
    return this.carrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carrosService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('archivo_texto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `texto-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(txt)$/)) {
          return callback(new BadRequestException('Solo se permiten archivos de texto (.txt)'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCarroDto: UpdateCarroDto, @UploadedFile() file?: Express.Multer.File) {
    return this.carrosService.update(id, updateCarroDto, file);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('archivo_texto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `texto-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(txt)$/)) {
          return callback(new BadRequestException('Solo se permiten archivos de texto (.txt)'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() updateCarroDto: UpdateCarroDto, @UploadedFile() file?: Express.Multer.File) {
    return this.carrosService.partialUpdate(id, updateCarroDto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carrosService.remove(id);
  }
}