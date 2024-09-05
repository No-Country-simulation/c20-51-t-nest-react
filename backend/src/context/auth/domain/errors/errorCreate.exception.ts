export class ErrorCreateException extends Error {
  constructor(email: string) {
    super(`Error al crear usuario con email ${email}`);
  }
}
