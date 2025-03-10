import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello world! Welcome to the ${process.env.NODE_ENV} environment.`;
  }
}
