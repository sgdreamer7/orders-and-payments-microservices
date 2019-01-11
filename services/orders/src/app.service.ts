import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'This is the "orders" microservice!';
  }
}
