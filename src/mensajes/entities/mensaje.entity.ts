import {Entity, PrimaryGeneratedColumn,Column } from "typeorm";



/**
 * Creacion de la entidad utilizando propiedades de typeorm 
 * con la informacion que se exportara a Xampp para la creacion de la tabla
 */
@Entity()

export class Mensaje {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nick: string;

    @Column()
    mensaje: string;
}
