import { UserEntity } from "../../../../core/database/models/user.model";

export const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useValue: UserEntity
  }
]
