export class ErrorUpdateCategory extends Error {
  constructor(public id: string) {
    super(`Error al actualizar el curso con id ${id}`);
  }
}
