export class ErrorDeleteCategory extends Error {
  constructor(public id: string) {
    super(`Error al eliminar el curso con id ${id}`);
  }
}
