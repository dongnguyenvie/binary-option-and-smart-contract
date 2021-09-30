import { HttpException, HttpStatus } from '@nestjs/common';

export default class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
