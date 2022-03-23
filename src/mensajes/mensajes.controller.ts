import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put,Res } from '@nestjs/common';
import { response } from 'express';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

//controlador con su identificador que sera usado en la ruta
@Controller('mensajes')
export class MensajesController {
     
    constructor(private mensajesServices: MensajesService){

    }

    // metodos http que seran usados para el manejo de los datos recibidos por el Body

    /**
     * then para recibir la respuesta
     * catch para capturar el error en tal caso
     * @param createMensajeDto parametro que se envia al servicio que creara el nuevo mensaje
     * then metodoflecha usado para capturar el mensaje de exito a la peticion http y devolviendolo
     * en formato Json
     * catch metodo flecha usado para capturar el error a la peticion http y devolviendo
     * un mensaje en formato Json
     */
     @Post()
     create (@Body() createMensajeDto: CreateMensajeDto, @Res() response){
         this.mensajesServices.createMensaje(createMensajeDto).then(mensaje=>{
             response.status(HttpStatus.CREATED).json(mensaje);
         }).catch(()=>{
             response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la creacion del mensaje'})
         });
     }

     @Get()
     getAll(@Res() response){
         this.mensajesServices.getAll().then(mensajesList =>{
             response.status(HttpStatus.OK).json(mensajesList);
         }).catch(()=>{
             response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la obtencion de mensajes'})
         });
     }

     @Put(':id')
     update(@Body() updateMensajeDto: CreateMensajeDto,@Res() response, @Param('id' )idMensaje){
         this.mensajesServices.updateMensaje(idMensaje,updateMensajeDto).then( mensaje =>{
             response.status(HttpStatus.OK).json(mensaje);
         }).catch(()=>{
             response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la actualizacion del mensaje'})
         });
     }

     @Delete(':id')  
      delete(@Res() response, @Param('id') idMensaje){
         this.mensajesServices.deleteMensaje(idMensaje).then(res =>{
             response.status(HttpStatus.OK).json(res);
         }).catch(()=>{
             response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la eliminacion del mensaje'})
         });
      }

     
}
