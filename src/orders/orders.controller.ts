import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  Query,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusValidationDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  // create a order
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create_order' }, createOrderDto);
  }

  // find All Orders
  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send({ cmd: 'find_all_orders' }, { orderPaginationDto }),
      );

      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // find One order by ID
  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send({ cmd: 'find_one_order' }, { id }),
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
      return this.client.send(
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

  // change Order Status (UPDATE-PATCH)
  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusValidationDto: StatusValidationDto,
  ) {
    try {
      return this.client.send(
        { cmd: 'change_order_status' },
        {
          id,
          status: statusValidationDto.status,
        },
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
