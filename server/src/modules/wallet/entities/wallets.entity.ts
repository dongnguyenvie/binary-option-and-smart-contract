import { WalletStatus } from 'src/modules/shared/constants/common.contant';
import { AbstractEntity } from 'src/modules/shared/entities/abstract-entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToOne, JoinColumn, RelationId, OneToMany } from 'typeorm';
import TransactionEntity from './transactions.entity';

@Entity({ name: 'wallets' })
export default class WalletEntity extends AbstractEntity {
  @Column('decimal', { name: 'balance', default: 0 })
  balance: number;

  @Column('varchar', { name: 'address', nullable: true })
  address: number;

  @Column('decimal', { name: 'total_deposit', default: 0 })
  totalDeposit: number;

  @Column('decimal', { name: 'total_withdraw', default: 0 })
  totalWithdraw: number;

  @Column('int', { default: WalletStatus.ACTIVE, name: 'status' })
  status: number;

  @Column({
    type: 'timestamp',
    name: 'active_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  activeDate: Date;

  /** User relationship */
  @OneToOne(() => UserEntity, { lazy: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id', unique: true })
  userId: string;
  /** User relationship */

  @OneToMany(() => TransactionEntity, (transaction) => transaction.wallet, {
    lazy: true,
    createForeignKeyConstraints: false,
  })
  transactions: TransactionEntity[];

  @RelationId((wallet: WalletEntity) => wallet.transactions)
  transactionIds: string[];

  constructor(partial: Partial<WalletEntity>) {
    super();
    Object.assign(this, partial);
  }

  static fromData(partial: Partial<WalletEntity>) {
    return new WalletEntity(partial);
  }
}
