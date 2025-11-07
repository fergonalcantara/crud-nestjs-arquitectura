import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `pdf-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf)$/)) {
          return callback(new BadRequestException('Solo se permiten archivos PDF'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }),
  )
  create(@Body() createMascotaDto: CreateMascotaDto, @UploadedFile() file?: Express.Multer.File) {
    return this.mascotasService.create(createMascotaDto, file);
  }

  @Get()
  findAll() {
    return this.mascotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mascotasService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `pdf-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf)$/)) {
          return callback(new BadRequestException('Solo se permiten archivos PDF'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMascotaDto: UpdateMascotaDto, @UploadedFile() file?: Express.Multer.File) {
    return this.mascotasService.update(id, updateMascotaDto, file);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `pdf-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf)$/)) {
          return callback(new BadRequestException('Solo se permiten archivos PDF'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() updateMascotaDto: UpdateMascotaDto, @UploadedFile() file?: Express.Multer.File) {
    return this.mascotasService.partialUpdate(id, updateMascotaDto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mascotasService.remove(id);
  }
}