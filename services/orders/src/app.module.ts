import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORM_CONFIG } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_CONFIG),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
