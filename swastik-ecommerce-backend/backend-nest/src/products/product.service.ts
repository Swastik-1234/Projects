// product.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './product.entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async getAllProducts(page: number, limit: number,sort:string, minPrice: number | undefined,
    maxPrice: number | undefined,): Promise<Products[]> {
    const skip = (page - 1) * limit;
    const queryBuilder = this.productRepository.createQueryBuilder('products');
    switch (sort) {
        case 'price':
          queryBuilder.orderBy('products.PRODUCT_PRICE', 'ASC');
          break;
        case 'rating':
          queryBuilder.orderBy('products.RATING', 'ASC');
          break;
        case 'PRODUCT_NAME':
          queryBuilder.orderBy('products.PRODUCT_NAME', 'ASC');
          break;
        default:
          // Default sorting by product name
          queryBuilder.orderBy('products.PRODUCT_NAME', 'ASC');
          break;
      }

      if (minPrice !== undefined && maxPrice !== undefined) {
        queryBuilder.andWhere('products.PRODUCT_PRICE >= :minPrice AND products.PRODUCT_PRICE <= :maxPrice', { minPrice, maxPrice });
      } else if (minPrice !== undefined) {
        queryBuilder.andWhere('products.PRODUCT_PRICE >= :minPrice', { minPrice });
      } else if (maxPrice !== undefined) {
        queryBuilder.andWhere('products.PRODUCT_PRICE <= :maxPrice', { maxPrice });
      }
      queryBuilder.skip(skip).take(limit);
    // return this.productRepository.find({
    //     skip,
    //     take:limit,
    // });
    return queryBuilder.getMany();
  
}

async getProductById(PRODUCT_ID: string): Promise<Products> {
    const product = await this.productRepository.findOne({where:{PRODUCT_ID}});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
