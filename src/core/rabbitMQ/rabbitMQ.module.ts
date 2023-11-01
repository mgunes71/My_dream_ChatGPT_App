import { Module, OnModuleInit } from "@nestjs/common";
import { RabbitMQService } from "./services/rabbitMQ.service";

@Module({
  imports: [],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService]
})

export class RabbitMQModule implements OnModuleInit{
  constructor(private rabbitMQService: RabbitMQService) {
  }

  async onModuleInit() {
    await this.rabbitMQService.Initialize();
  }
}
