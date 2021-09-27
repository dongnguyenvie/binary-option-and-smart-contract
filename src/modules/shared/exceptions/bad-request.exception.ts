import { HttpException, HttpStatus } from '@nestjs/common';

export default class BadRequestException extends HttpException {
  constructor() {
    super('Bad request', HttpStatus.BAD_REQUEST);
  }
}
