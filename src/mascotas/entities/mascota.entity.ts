import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

@Entity('mascotas')
export class Mascota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  especie: string;

  @Column({ length: 50 })
  raza: string;

  @Column({ type: 'int' })
  edad: number;

  @Column({ length: 50 })
  color: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pdf_url: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
