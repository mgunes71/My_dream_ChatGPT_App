import { Module, OnModuleInit } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { SocketIOService } from "./services/socketIO.service";
import { AuthenticationService } from "../../applications/modules/auth/services/authentication.service";
import { UserService } from "../../applications/modules/user/services/user.service";
import { AuthenticationModule } from "../../applications/modules/auth/auth.module";
import { UserModule } from "../../applications/modules/user/user.module";

@Module({
  imports: [AuthenticationModule, UserModule],
  controllers: [],
  providers: [SocketIOService],
  exports: [SocketIOService]
})

export class SocketIOModule implements OnModuleInit {
  constructor(private adapterHost: HttpAdapterHost, private socketService: SocketIOService, private authService: AuthenticationService, private userService: UserService) {
  }

  async onModuleInit() {
    const httpAdapter = this.adapterHost.httpAdapter;
    const httpServer = httpAdapter.getHttpServer();

    this.socketService.createSocketServer(httpServer);

    this.socketService.onConnect().subscribe((socket) => {
      socket.on('authenticate', async (tokenData: string) => {
        if (!tokenData || !tokenData.includes("Bearer")) {
          socket.disconnect(true);
          console.log('disconnect')
          return;
        }

        const token = tokenData.replace("Bearer ", "");
        if (!token || token.toString().trim() === "") {
          socket.disconnect(true);
          return;
        }

        try {
          const decoded = await this.authService.verifyToken(token);
          const user = await this.userService.findByPk(decoded.id);

          socket['user'] = user.email;
          socket.join(user.email);

        } catch (e) {
          socket.disconnect(true);
          console.log('disconnect');
        }
      });
    });
  }

}
