import { Cuota } from "./cuota"

export class Solicitud{
    id?: number
    cedulaCliente?: string
    nombreCliente?: string
    correoElectronico?: string
    fecha?: Date
    monto?: number
    meses?: number
    cuotas?: Cuota[]
}