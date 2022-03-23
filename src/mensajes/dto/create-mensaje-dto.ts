/**
 * clase que representa toda la informacion recibida por el Body
 * Dto: objetos que permiten encapsular la informacion que nos llega
 * @param CreateMensajeDto  encapsulara toda la informacion recibida
 */
export class CreateMensajeDto {
    readonly nick: string;
    readonly mensaje: string;
}
