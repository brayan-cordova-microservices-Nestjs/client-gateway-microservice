import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusValidationDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  // create a order
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'create_order' }, createOrderDto);
  }

  // find All Orders
  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send(
      { cmd: 'find_all_orders' },
      orderPaginationDto,
    );
  }

  // find One order by ID
  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send({ cmd: 'find_one_order' }, { id }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // find All By Status
  @Get(':status')
  async findAllByStatus(
    @Param() statusValidationDto: StatusValidationDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.ordersClient.send(
        { cmd: 'find_all_orders' },
        {
          ...paginationDto,
          status: statusValidationDto.status,
        },
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
