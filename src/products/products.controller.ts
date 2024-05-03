import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  // create a product
  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  // find All products
  @Get()
  findAllProducts() {
    return 'This action return all products';
  }

  // find One product by ID
  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return `This action return product with id-${id}`;
  }

  // update product (PATCH)
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return `This action updates product with id-${id}`;
  }

  // delete product (SOFT DELETE)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `This action removes product with id-${id}`;
  }
}
