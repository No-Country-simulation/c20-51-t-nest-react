export class UserNotFoundException extends Error {
  constructor(id: string) {
    super(`No se encontro el usuario con el id ${id}`);
  }
}
