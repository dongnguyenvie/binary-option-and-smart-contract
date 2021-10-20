import { AbstractEntity } from 'src/modules/shared/entities/abstract-entity';
import { Entity, Column, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'nft' })
export default class NftEntity extends AbstractEntity {
  @Column('varchar', { name: 'token_id' })
  tokenId: string;

  @Column('varchar', { name: 'description' })
  description: string;

  @Column('text', { name: 'name' })
  name: string;

  @Column('jsonb', {
    name: 'attributes',
    nullable: true,
    default: [],
  })
  attributes: string;

  constructor(partial: Partial<NftEntity>) {
    super();
    Object.assign(this, partial);
  }

  static fromData(partial: Partial<NftEntity>) {
    return new NftEntity(partial);
  }
}
