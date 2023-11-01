import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthenticationModule } from "./modules/auth/auth.module";

@Module({
  imports: [AuthenticationModule, UserModule],
  exports: []
})

export class ApplicationsModule {

}
