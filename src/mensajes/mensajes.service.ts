 import { Injectable } from '@nestjs/common';
 import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';
import {Repository} from'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
 

@Injectable()
export class MensajesService {
    /**
     * Inyeccion,obtenemos una instacia del repositorio(clase interna de typeorm)
     * y esta trae todos los metodos existentes y todo se hace gracias al constructor del servicio
     * @param Repository este indica que es un repositorio de tipo <Mensaje>
     * @param Mensaje esta es la entidad importada desde el app.module
     */
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>
    ){}

   //Metodos que queremos usar para CRUD de nuestra entidad 

   //Metodo asincrono para obtener todos los mensajes existentes u objectos de tipo Mensaje
   //SE usa Promise para esperar la respuesta dependiendo del tiempo de respuesta del servidor
    async getAll():Promise<Mensaje[]>{
        return await this.mensajeRepository.find();
    }

    /**
     * Este metodo asincrono es usado para crear el nuevo mensaje,recibiendo un parametro
     * de tipo CreateMensajeDto que llegan desde el Body y guardandolo en la variable mensajeNuevo
     * @param mensajeNuevo parametros recibidos
     * @param nuevo variable de tipo Mensaje que almacenara lo recibido por mensajeNuevo
     * @returns respuesta de haber guardado el mensaje usando los metodos internos de typeorm(save)
     */
    async createMensaje (mensajeNuevo: CreateMensajeDto):Promise<Mensaje> {
       
        const nuevo = new Mensaje();
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;

        return this.mensajeRepository.save(nuevo);
    }

    /**
     * Metodo asincrono de actualizacion de mensaje, similiar al metodo de crear
     * @param idMensaje id del mensaje para buscarlo y asi traer los datos a modificar
     * @param mensajeActualizar variable que guarda el objeto recibido por CreateMensajeDto desde el Body
     * @returns confirmacion de mensaje actualizado
    */
    async updateMensaje(idMensaje: number, mensajeActualizar: CreateMensajeDto):Promise<Mensaje> {
        const mensajeUpdate = await this.mensajeRepository.findOne(idMensaje);
        mensajeUpdate.nick = mensajeActualizar.nick;
        mensajeUpdate.mensaje = mensajeActualizar.mensaje;

        return this.mensajeRepository.save(mensajeUpdate)
    }

    /**
     * Metodo asincrono para borrar un mensaje existente de la bd
     * @param idMensaje id recibido como parametro para buscar el mensaje a eliminar
     * @returns confirmacion de mensaje borrado
     */
    async deleteMensaje(idMensaje:number):Promise<any> {
        return await this.mensajeRepository.delete(idMensaje)
    }
}
