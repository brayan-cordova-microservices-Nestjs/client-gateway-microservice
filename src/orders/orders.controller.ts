import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  // create a order
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'create_order' }, createOrderDto);
  }

  // find All orders
  @Get()
  findAllOrders() {
    return this.ordersClient.send({ cmd: 'find_all_orders' }, {});
  }

  // find One order by ID
  @Get(':id')
  async findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send({ cmd: 'find_one_order' }, { id }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
