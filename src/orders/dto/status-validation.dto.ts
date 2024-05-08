import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class StatusValidationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList}`,
  })
  status: OrderStatus;
}
