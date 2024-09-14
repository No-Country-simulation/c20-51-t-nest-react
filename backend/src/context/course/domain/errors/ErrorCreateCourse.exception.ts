export class ErrorCreateCourse extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorCreateCourse';
  }
}
