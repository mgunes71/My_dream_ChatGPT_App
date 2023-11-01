import { Module } from "@nestjs/common";
import { DreamController } from "./controllers/dream.controller";
import { DreamService } from "./services/dream.service";
import { dreamProvider } from "./providers/dream.provider";

@Module({
  imports: [],
  controllers: [DreamController],
  providers: [DreamService, ...dreamProvider],
  exports: [DreamService]
})

export class DreamModule {

}
