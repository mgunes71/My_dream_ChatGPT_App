import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../../../../core/database/models/user.model";

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof UserEntity) {
  }

  async findByPk(id: number) {
    try {
      const user = await this.userRepository.findByPk(id);
      return user;
    } catch (e) {
      throw new BadRequestException('user not found');
    }
  }
}
