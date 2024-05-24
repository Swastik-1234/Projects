// src/entities/user.entity.ts

import { Order } from 'src/ordres/orders.entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  shippingAddress: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
