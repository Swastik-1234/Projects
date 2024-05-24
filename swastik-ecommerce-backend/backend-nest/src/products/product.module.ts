// product.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Products } from './product.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
