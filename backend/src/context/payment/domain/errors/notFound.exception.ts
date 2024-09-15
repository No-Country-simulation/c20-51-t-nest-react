export class NotFoundPayment extends Error {
  constructor(public id: string) {
    super(`No se encuentra el pago con id ${id}`);
  }
}
