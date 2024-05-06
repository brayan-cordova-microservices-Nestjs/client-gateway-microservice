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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
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
  async findOneProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }

    // return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
    //   catchError((error) => {
    //     throw new RpcException(error);
    //   }),
    // );
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
