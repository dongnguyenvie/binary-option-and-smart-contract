import { EntityRepository, Repository } from 'typeorm';
import TransactionEntity from '../entities/transactions.entity';

@EntityRepository(TransactionEntity)
export default class TransactionRepository extends Repository<TransactionEntity> {}
