import { Get, Controller } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ title: 'Default endpoint' })
  @ApiResponse({ status: 200, description: 'This is the "orders" microservice!' })
  root(): string {
    return this.appService.root();
  }
}
