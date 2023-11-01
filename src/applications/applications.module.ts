import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthenticationModule } from "./modules/auth/auth.module";
import { DreamModule } from "./modules/dream/dream.module";

@Module({
  imports: [AuthenticationModule, UserModule, DreamModule],
  exports: []
})

export class ApplicationsModule {

}
