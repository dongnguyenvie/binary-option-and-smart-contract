import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BetType, OrderStatus } from 'src/modules/shared/constants/common.contant';
import CurrentUser from 'src/modules/shared/decorators/user.decorator';
import PoliciesGuard from 'src/modules/shared/guards/policies.guard';
import { CurrentUser as ICurrentUser } from 'src/modules/shared/interfaces/common.interface';
import OrderStatusDto from '../dtos/order.dto';
import OrderService from '../services/order.service';

@Controller('orders')
export default class OrderController {
  constructor(private orderService: OrderService) {}
  @Get(':id')
  findOne(@Param('id') id: string): string {
    this.orderService.emitCreateNewOrder({
      id: '12312',
      amount: 10,
      asset: 'BTC/USDT',
      betType: BetType.BUY,
      userId: '12312',
      status: OrderStatus.WAITING,
    });
    return `This action returns a #${id} cat`;
  }

  @PoliciesGuard()
  @Post()
  async createOrder(@Body() orderDto: OrderStatusDto, @CurrentUser() user: ICurrentUser) {
    return this.orderService.createOrder(orderDto, user);
  }
}
