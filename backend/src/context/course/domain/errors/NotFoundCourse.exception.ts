export class NotFoundCourse extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundCourse';
  }
}
