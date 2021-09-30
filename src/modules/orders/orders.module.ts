import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SharedModule from '../shared/shared-module';
import OrderController from './controllers/order.controllder';
import OrderRepository from './repositories/order.repository';
import OrderService from './services/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository]), SharedModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [],
})
export default class OrdersModule {}
