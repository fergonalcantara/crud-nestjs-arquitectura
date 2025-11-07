import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('carros')
export class Carro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    marca: string;

    @Column({ length: 50 })
    modelo: string;

    @Column({ type: 'int' })
    anio: number;

    @Column({ length: 50 })
    color: string;

    @Column({ length: 20, unique: true })
    placa: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    archivo_texto_url: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
