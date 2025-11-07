import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto, file?: Express.Multer.File): Promise<Usuario> {
    const nuevoUsuario = new Usuario();
    nuevoUsuario.nombre = createUsuarioDto.nombre;
    nuevoUsuario.email = createUsuarioDto.email;
    nuevoUsuario.telefono = createUsuarioDto.telefono;
    nuevoUsuario.direccion = createUsuarioDto.direccion;
    nuevoUsuario.edad = createUsuarioDto.edad;
    nuevoUsuario.imagen_url = file ? `/uploads/${file.filename}` : null;

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto, file?: Express.Multer.File): Promise<Usuario> {
    const usuario = await this.findOne(id);
    
    usuario.nombre = updateUsuarioDto.nombre ?? usuario.nombre;
    usuario.email = updateUsuarioDto.email ?? usuario.email;
    usuario.telefono = updateUsuarioDto.telefono ?? usuario.telefono;
    usuario.direccion = updateUsuarioDto.direccion ?? usuario.direccion;
    usuario.edad = updateUsuarioDto.edad ?? usuario.edad;
    
    if (file) {
      usuario.imagen_url = `/uploads/${file.filename}`;
    }
    
    return await this.usuarioRepository.save(usuario);
  }

  async partialUpdate(id: number, updateUsuarioDto: Partial<UpdateUsuarioDto>, file?: Express.Multer.File): Promise<Usuario> {
    const usuario = await this.findOne(id);
    
    if (updateUsuarioDto.nombre !== undefined) usuario.nombre = updateUsuarioDto.nombre;
    if (updateUsuarioDto.email !== undefined) usuario.email = updateUsuarioDto.email;
    if (updateUsuarioDto.telefono !== undefined) usuario.telefono = updateUsuarioDto.telefono;
    if (updateUsuarioDto.direccion !== undefined) usuario.direccion = updateUsuarioDto.direccion;
    if (updateUsuarioDto.edad !== undefined) usuario.edad = updateUsuarioDto.edad;
    
    if (file) {
      usuario.imagen_url = `/uploads/${file.filename}`;
    }
    
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}