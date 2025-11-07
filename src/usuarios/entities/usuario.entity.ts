import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 15 })
  telefono: string;

  @Column({ length: 200 })
  direccion: string;

  @Column({ type: 'int' })
  edad: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen_url: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}