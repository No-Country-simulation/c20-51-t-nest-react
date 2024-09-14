export class NotFoundCategory extends Error {
  constructor(public id: string) {
    super(`No se encuentra el curso con id ${id}`);
  }
}
