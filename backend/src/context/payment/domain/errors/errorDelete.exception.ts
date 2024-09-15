export class ErrorDeletePayment extends Error {
  constructor(public id: string) {
    super(`Error al eliminar el pago con id ${id}`);
  }
}
