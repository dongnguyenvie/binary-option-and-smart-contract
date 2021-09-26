import { AbstractEntity } from 'src/modules/shared/entities/abstract-entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
  @Column('varchar', { nullable: true, unique: true })
  username: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', {
    nullable: false,
  })
  password: string;

  @Column('varchar', {
    nullable: true,
  })
  mobile: string;

  @Column('boolean', {
    default: false,
  })
  isSuper: boolean;

  @Column('varchar', {
    name: 'full_name',
    nullable: true,
  })
  fullName: string;

  @Column('text', { nullable: true })
  profile: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  static fromData(partial: Partial<UserEntity>) {
    return new UserEntity(partial);
  }
}
