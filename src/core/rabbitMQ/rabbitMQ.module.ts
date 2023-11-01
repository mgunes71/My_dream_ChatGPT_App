import { Module, OnModuleInit } from "@nestjs/common";
import { RabbitMQService } from "./services/rabbitMQ.service";
import { dreamProvider } from "../../applications/modules/dream/providers/dream.provider";
import { SocketIOModule } from "../socketIO/socketIO.module";

@Module({
  imports: [SocketIOModule],
  controllers: [],
  providers: [RabbitMQService, ...dreamProvider],
  exports: [RabbitMQService]
})

export class RabbitMQModule implements OnModuleInit{
  constructor(private rabbitMQService: RabbitMQService) {
  }

  async onModuleInit() {
    await this.rabbitMQService.Initialize();
  }
}
