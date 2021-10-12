import OrderEntity from 'src/modules/orders/entities/order.entity';
import { AbstractEntity } from 'src/modules/shared/entities/abstract-entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import WalletEntity from './wallets.entity';

@Entity({ name: 'transactions' })
export default class TransactionEntity extends AbstractEntity {
  @Column('int', { name: 'type' })
  type: number;

  @Column('decimal', { name: 'credit', default: 0 })
  credit: number;

  @Column('decimal', { name: 'debit', default: 0 })
  debit: number;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  /** User relationship */
  @ManyToOne(() => UserEntity, (user) => user.transactions, {
    lazy: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: string;
  /** User relationship */

  /** Wallet relationship */
  @ManyToOne(() => WalletEntity, (wallet) => wallet.transactions, {
    lazy: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'wallet_id' })
  wallet: WalletEntity;

  @Column({ name: 'wallet_id' })
  walletId: string;
  /** Wallet relationship */

  @ManyToOne(() => UserEntity, {
    lazy: true,
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({ name: 'create_by' })
  createBy: UserEntity;

  @OneToOne(() => OrderEntity, { lazy: true, createForeignKeyConstraints: false, nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column({ name: 'order_id', nullable: true })
  orderId: string;
}
