import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { DreamService } from "../services/dream.service";
import { AuthenticatedUser } from "../../auth/decorators/authenticated-user.decorator";
import { CreateDreamDto } from "../../../../core/database/dtos/dream.dto";
import { UserAuthGuard } from "../../auth/guards/auth.guard";

@UseGuards(UserAuthGuard)
@Controller('dream')
export class DreamController {
  constructor(private dreamService: DreamService) {
  }

  @Post('askToAI')
  async askToAI(@AuthenticatedUser() user: any, @Body() DreamDto: CreateDreamDto) {
    return this.dreamService.askToAI(user, DreamDto);
  }
}
