import { Injectable } from '@nestjs/common';
import { Status } from 'src/modules/shared/enums/common';
import { CreateUser } from '../interface';
import UserRepository from '../repositories/user.repository';

@Injectable()
export default class UserService {
  constructor(private userRepo: UserRepository) {}

  getUsers() {
    return this.userRepo.find({});
  }

  getUserById(id: string) {
    return this.userRepo.findOne({ id: id });
  }

  async findOneByEmail(email: string) {
    return this.userRepo.findOne({ email });
  }

  async createUser(user: CreateUser) {
    try {
      const newUser = this.userRepo.create({
        ...user,
        status: Status.ACTIVE,
      });
      const result = await this.userRepo.save(newUser);

      return {
        id: result.id,
      };
    } catch (error) {
      return error;
    }
  }
}
