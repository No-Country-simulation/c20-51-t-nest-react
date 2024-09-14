export class ErrorCreateCategory extends Error {
  constructor(public message: string) {
    super(message);
  }
}
