// product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
//import { v4 as uuid } from 'uuid';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  PRODUCT_ID: string;

  @Column()
  PRODUCT_NAME: string;
  @Column()
  PRODUCT_MODEL: string;

  @Column()
  AVAILABILITY: number;

  @Column()
  RATING: number;
  @Column()
  TYPE: string;

 @Column()
  PRODUCT_PRICE: string;
  
 

 
}
