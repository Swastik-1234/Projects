import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from '../auth/user-entities';
import { Products } from '../products/product.entities';

@Entity()
export class Order {
//   @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  orderId: string;

 
@ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'id' }) // Specify the name of the foreign key column
  user: User;

  @Column()
  userId: string

  @Column({ nullable: true })
  shippingAddress: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

//   @ManyToMany(() => Products)
//   @JoinTable()
//   itemsPurchased: Products[];

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalPrice: number;

  @Column()
  paymentMethod: string;

  @Column({ default: false })
  orderStatus: boolean;
}
