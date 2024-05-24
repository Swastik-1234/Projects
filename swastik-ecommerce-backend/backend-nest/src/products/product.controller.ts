// product.controller.ts

import { Controller, Get ,Param,ParseUUIDPipe,Query} from '@nestjs/common';
import { ProductService } from './product.service';
import { Products } from './product.entities';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query ('sort') sort:string='PRODUCT_NAME',
    @Query('minPrice') minPrice: number = 0,
    @Query('maxPrice') maxPrice: number = Number.MAX_SAFE_INTEGER,
    )  : Promise<Products[]>{

    return this.productService.getAllProducts(page,limit,sort,minPrice,maxPrice);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Products> {
    return this.productService.getProductById(id); // Call service method to fetch product by ID
  }
}
