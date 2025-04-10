export default class AppError {
  protected message: string = "";
  protected statusCode: number = 500;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
