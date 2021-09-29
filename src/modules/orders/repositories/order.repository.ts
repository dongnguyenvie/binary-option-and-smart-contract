import { EntityRepository, Repository } from 'typeorm';
import OrderEntity from '../entities/order.entity';

@EntityRepository(OrderEntity)
export default class OrderRepository extends Repository<OrderEntity> {}
