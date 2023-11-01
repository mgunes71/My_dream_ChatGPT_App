import { Controller } from "@nestjs/common";
import { DreamService } from "../services/dream.service";

@Controller()
export class DreamController {
  constructor(private dreamService: DreamService) {
  }
}
