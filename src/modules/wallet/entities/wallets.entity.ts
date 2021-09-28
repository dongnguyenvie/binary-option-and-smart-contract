import { WalletStatus } from 'src/modules/shared/constants/common.contant';
import { AbstractEntity } from 'src/modules/shared/entities/abstract-entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToOne, JoinColumn, RelationId, OneToMany, Unique, Index } from 'typeorm';
import TransactionEntity from './transactions.entity';

@Entity({ name: 'wallets' })
export default class WalletEntity extends AbstractEntity {
  @Column('decimal', { name: 'balance', default: 0 })
  balance: number;

  /** User relationship */
  @OneToOne(() => UserEntity, { lazy: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id', unique: true })
  userId: string;
  /** User relationship */

  @Column('int', { default: WalletStatus.ACTIVE, name: 'status' })
  status: number;

  @Column({
    type: 'timestamp',
    name: 'active_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  activeDate: Date;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.wallet, { lazy: true })
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
