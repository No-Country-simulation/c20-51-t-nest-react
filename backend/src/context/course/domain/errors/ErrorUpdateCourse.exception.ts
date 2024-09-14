export class ErrorUpdateCourse extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorUpdateCourse';
  }
}
