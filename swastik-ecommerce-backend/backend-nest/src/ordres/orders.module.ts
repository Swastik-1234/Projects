import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entities';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { User } from 'src/auth/user-entities';

@Module({
  imports: [TypeOrmModule.forFeature([Order,User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
