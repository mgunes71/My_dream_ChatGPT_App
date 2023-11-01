import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserDto } from "../../../../core/database/dtos/user.dto";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

}
