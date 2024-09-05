export class ErrorLoginException extends Error {
  constructor(email: string) {
    super(`Error al autenticar el usuario ${email}`);
  }
}
