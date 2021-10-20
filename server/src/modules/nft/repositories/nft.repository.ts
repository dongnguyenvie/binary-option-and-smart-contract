import { EntityRepository, Repository } from 'typeorm';
import NftEntity from '../entities/nft.entity';

@EntityRepository(NftEntity)
export default class NftRepository extends Repository<NftEntity> {}
