import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from "./core/core.module";
import { ApplicationsModule } from "./applications/applications.module";

@Module({
  imports: [CoreModule, ApplicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
