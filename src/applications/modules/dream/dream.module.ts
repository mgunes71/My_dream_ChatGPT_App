import { Module } from "@nestjs/common";
import { DreamController } from "./controllers/dream.controller";
import { DreamService } from "./services/dream.service";
import { dreamProvider } from "./providers/dream.provider";
import { RabbitMQModule } from "../../../core/rabbitMQ/rabbitMQ.module";

@Module({
  imports: [RabbitMQModule],
  controllers: [DreamController],
  providers: [DreamService, ...dreamProvider],
  exports: [DreamService]
})

export class DreamModule {

}
