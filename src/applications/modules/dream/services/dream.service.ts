import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { OpenAI } from "openai";
import { DreamEntity } from "../../../../core/database/models/dream.model";
import { AskDreamDto, CreateDreamDto } from "../../../../core/database/dtos/dream.dto";
import { RabbitMQService } from "../../../../core/rabbitMQ/services/rabbitMQ.service";

@Injectable()
export class DreamService {
  private openai: any = null;

  constructor(@Inject("DREAM_REPOSITORY") private dreamRepository: typeof DreamEntity, private rabbitMQService: RabbitMQService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY
    });
  }

  getOpenAI(): OpenAI {
    return this.openai;
  }


  async askToAI(user: any, dreamDto: AskDreamDto) {
    const questions = [];
    questions.push({role: 'user', content: dreamDto.question});

    const answerAI = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: questions
    });

    const response = answerAI.choices[0].message.content;

    const body = {
      user: user,
      name: dreamDto.name,
      question: dreamDto.question,
      text: response,
    }

    const stringMessage = JSON.stringify(body);
    const channel = this.rabbitMQService.getChannel();
    channel.sendToQueue('dream', Buffer.from(stringMessage));

    console.log('send message to que');
  }


  async createDream(user: any, dreamDto: CreateDreamDto) {
    try {
      await this.dreamRepository.create({
        userId: user.id,
        name: dreamDto.name,
        text: dreamDto.text
      });
    } catch (e) {
      throw new BadRequestException("Dream cannot created");
    }
  }

  async getDreams(user: any) {
    try {
      return await this.dreamRepository.findAll({
        where: {
          userId: user.id
        }
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Internal Server error");
    }
  }

  async getDreamById(user: any, id: number) {
    try {
      return await this.dreamRepository.findOne({
        where: {
          userId: user.id,
          id: id
        }
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Dream not found");
    }
  }

  async deleteDream(user: any, id: number) {
    try {
      return await this.dreamRepository.destroy({
        where: {
          userId: user.id,
          id: id
        }
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Dream cannot delete");
    }
  }

}
