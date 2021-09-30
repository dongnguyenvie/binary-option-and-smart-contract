import { EntityRepository, Repository } from 'typeorm';
import WalletEntity from '../entities/wallets.entity';

@EntityRepository(WalletEntity)
export default class WalletRepository extends Repository<WalletEntity> {}
