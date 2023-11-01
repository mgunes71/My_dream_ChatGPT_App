import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { SocketIOModule } from "./socketIO/socketIO.module";
import { RabbitMQModule } from "./rabbitMQ/rabbitMQ.module";

@Module({
  imports: [DatabaseModule, SocketIOModule, RabbitMQModule],
  exports: []
})
export class CoreModule {}
