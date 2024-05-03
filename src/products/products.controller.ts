import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  // create a product
  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  // find All products
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
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
