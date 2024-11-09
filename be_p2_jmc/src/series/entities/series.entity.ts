import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('series')
export class Series {
    @PrimaryGeneratedColumn('identity')
    id: number;
    @Column('varchar', { length: 250 })
    titulo: string;
    @Column('varchar', { length: 5000 })
    sinopsis: string;

    @Column('varchar', { length: 100 })
    director: string;

    @Column('int')
    temporadas: number;

    @Column('date', { name: 'fecha_estreno' })
    fechaEstreno: Date;

    // @Column('varchar', { name: 'tipo_clasicicacion', length: 20 })
    // tipoclasificacion: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
  
    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;
  
    @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
    fechaEliminacion: Date;
}
