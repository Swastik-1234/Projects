import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entities';

// @Injectable()
// export class OrderService {
//   constructor(
//     @InjectRepository(Order)
//     private readonly orderRepository: Repository<Order>,
//   ) {}

//   async getAllOrders(): Promise<Order[]> {
//     return this.orderRepository.find();
//   }

//   async getOrderById(id: string): Promise<Order> {
//     return this.orderRepository.findOne(id);
//   }
// }

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: {orderId} });
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    return order;
  }
}
