import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carro } from './entities/carro.entity';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';

@Injectable()
export class CarrosService {
  constructor(
    @InjectRepository(Carro)
    private carroRepository: Repository<Carro>,
  ) { }

  async create(createCarroDto: CreateCarroDto, file?: Express.Multer.File): Promise<Carro> {
    const nuevoCarro = new Carro();
    nuevoCarro.marca = createCarroDto.marca;
    nuevoCarro.modelo = createCarroDto.modelo;
    nuevoCarro.anio = createCarroDto.anio;
    nuevoCarro.color = createCarroDto.color;
    nuevoCarro.placa = createCarroDto.placa;
    nuevoCarro.archivo_texto_url = file ? `/uploads/${file.filename}` : null;

    return await this.carroRepository.save(nuevoCarro);
  }

  async findAll(): Promise<Carro[]> {
    return await this.carroRepository.find();
  }

  async findOne(id: number): Promise<Carro> {
    const carro = await this.carroRepository.findOne({ where: { id } });
    if (!carro) {
      throw new NotFoundException(`Carro con ID ${id} no encontrado`);
    }
    return carro;
  }

  async update(id: number, updateCarroDto: UpdateCarroDto, file?: Express.Multer.File): Promise<Carro> {
    const carro = await this.findOne(id);

    carro.marca = updateCarroDto.marca ?? carro.marca;
    carro.modelo = updateCarroDto.modelo ?? carro.modelo;
    carro.anio = updateCarroDto.anio ?? carro.anio;
    carro.color = updateCarroDto.color ?? carro.color;
    carro.placa = updateCarroDto.placa ?? carro.placa;

    if (file) {
      carro.archivo_texto_url = `/uploads/${file.filename}`;
    }

    return await this.carroRepository.save(carro);
  }

  async partialUpdate(id: number, updateCarroDto: Partial<UpdateCarroDto>, file?: Express.Multer.File): Promise<Carro> {
    const carro = await this.findOne(id);

    if (updateCarroDto.marca !== undefined) carro.marca = updateCarroDto.marca;
    if (updateCarroDto.modelo !== undefined) carro.modelo = updateCarroDto.modelo;
    if (updateCarroDto.anio !== undefined) carro.anio = updateCarroDto.anio;
    if (updateCarroDto.color !== undefined) carro.color = updateCarroDto.color;
    if (updateCarroDto.placa !== undefined) carro.placa = updateCarroDto.placa;

    if (file) {
      carro.archivo_texto_url = `/uploads/${file.filename}`;
    }

    return await this.carroRepository.save(carro);
  }

  async remove(id: number): Promise<void> {
    const carro = await this.findOne(id);
    await this.carroRepository.remove(carro);
  }
}