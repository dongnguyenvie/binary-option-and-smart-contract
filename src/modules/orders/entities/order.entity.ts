import { AbstractEntity } from 'src/modules/shared/entities/abstract-entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import TransactionEntity from 'src/modules/wallet/entities/transactions.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { OrderStatus } from '../consttants/order.contstant';

@Entity({ name: 'orders' })
export default class OrderEntity extends AbstractEntity {
  @Column('decimal', { name: 'order_status', default: OrderStatus.WAITING })
  status: number;

  @Column('decimal', { name: 'bet_type', nullable: false })
  betType: number;

  @Column('decimal', { name: 'amount', nullable: false })
  amount: number;

  @Column('float', { name: 'payout', default: 1 })
  payout: number;

  @Column('float', { name: 'profit', default: 0 })
  profit: number;

  @Column('varchar', { name: 'asset', default: 'BTC/USDT' })
  asset: string;

  @Column('decimal', { name: 'duration', default: 60 })
  duration: number;

  @Column('decimal', { name: 'open_time', nullable: false })
  openTime: number;

  @Column({
    type: 'timestamp',
    name: 'order_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  orderDate: Date;

  /** User relationship */
  @OneToOne(() => UserEntity, { lazy: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: string;
  /** User relationship */

  /** Transaction relationship */
  @OneToOne(() => TransactionEntity, { lazy: true, createForeignKeyConstraints: false })
  transaction: TransactionEntity;
  /** Transaction relationship */

  constructor(partial: Partial<OrderEntity>) {
    super();
    Object.assign(this, partial);
  }

  static fromData(partial: Partial<OrderEntity>) {
    return new OrderEntity(partial);
  }
}
