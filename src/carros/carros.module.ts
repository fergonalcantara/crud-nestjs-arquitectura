import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrosService } from './carros.service';
import { CarrosController } from './carros.controller';
import { Carro } from './entities/carro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carro])],
  controllers: [CarrosController],
  providers: [CarrosService],
})
export class CarrosModule {}
