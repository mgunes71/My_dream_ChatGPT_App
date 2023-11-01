import { Inject, Injectable } from "@nestjs/common";
import { OpenAI } from "openai";
import { DreamEntity } from "../../../../core/database/models/dream.model";

@Injectable()
export class DreamService {
  private openai: any = null;

  constructor(@Inject("DREAM_REPOSITORY") private dreamRepository: typeof DreamEntity) {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY
    });
  }

  getOpenAI(): OpenAI {
    return this.openai;
  }


  async createDream() {}

}
