import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from './orders.service';
import { Order } from './orders.entities';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

//   @Get()
//   async getAllOrders(): Promise<Order[]> {
//     return this.orderService.getAllOrders();
//   }

  @Get(':id')
  async getOrderById(@Param('id' ) id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }
}
