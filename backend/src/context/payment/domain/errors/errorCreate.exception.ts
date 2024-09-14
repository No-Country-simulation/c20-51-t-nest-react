export class ErrorCreatePayment extends Error {
  constructor(public message: string) {
    super(message);
  }
}
