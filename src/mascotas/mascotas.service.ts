import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private mascotaRepository: Repository<Mascota>,
  ) { }

  async create(createMascotaDto: CreateMascotaDto, file?: Express.Multer.File): Promise<Mascota> {
    const nuevaMascota = new Mascota();
    nuevaMascota.nombre = createMascotaDto.nombre;
    nuevaMascota.especie = createMascotaDto.especie;
    nuevaMascota.raza = createMascotaDto.raza;
    nuevaMascota.edad = createMascotaDto.edad;
    nuevaMascota.color = createMascotaDto.color;
    nuevaMascota.pdf_url = file ? `/uploads/${file.filename}` : null;

    return await this.mascotaRepository.save(nuevaMascota);
  }

  async findAll(): Promise<Mascota[]> {
    return await this.mascotaRepository.find();
  }

  async findOne(id: number): Promise<Mascota> {
    const mascota = await this.mascotaRepository.findOne({ where: { id } });
    if (!mascota) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    return mascota;
  }

  async update(id: number, updateMascotaDto: UpdateMascotaDto, file?: Express.Multer.File): Promise<Mascota> {
    const mascota = await this.findOne(id);

    mascota.nombre = updateMascotaDto.nombre ?? mascota.nombre;
    mascota.especie = updateMascotaDto.especie ?? mascota.especie;
    mascota.raza = updateMascotaDto.raza ?? mascota.raza;
    mascota.edad = updateMascotaDto.edad ?? mascota.edad;
    mascota.color = updateMascotaDto.color ?? mascota.color;

    if (file) {
      mascota.pdf_url = `/uploads/${file.filename}`;
    }

    return await this.mascotaRepository.save(mascota);
  }

  async partialUpdate(id: number, updateMascotaDto: Partial<UpdateMascotaDto>, file?: Express.Multer.File): Promise<Mascota> {
    const mascota = await this.findOne(id);

    if (updateMascotaDto.nombre !== undefined) mascota.nombre = updateMascotaDto.nombre;
    if (updateMascotaDto.especie !== undefined) mascota.especie = updateMascotaDto.especie;
    if (updateMascotaDto.raza !== undefined) mascota.raza = updateMascotaDto.raza;
    if (updateMascotaDto.edad !== undefined) mascota.edad = updateMascotaDto.edad;
    if (updateMascotaDto.color !== undefined) mascota.color = updateMascotaDto.color;

    if (file) {
      mascota.pdf_url = `/uploads/${file.filename}`;
    }

    return await this.mascotaRepository.save(mascota);
  }

  async remove(id: number): Promise<void> {
    const mascota = await this.findOne(id);
    await this.mascotaRepository.remove(mascota);
  }
}