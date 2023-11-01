import { Inject, Injectable } from "@nestjs/common";
import * as amqp from 'amqplib';
import { DreamEntity } from "../../database/models/dream.model";
import { SocketIOService } from "../../socketIO/services/socketIO.service";

@Injectable()
export class RabbitMQService {
  private channel: any;
  constructor(@Inject('DREAM_REPOSITORY') private dreamRepository: typeof DreamEntity, private socketService: SocketIOService) {}

  async Initialize() {
    const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@localhost:${process.env.RABBITMQ_PORT}`);
    const channel = await connection.createChannel();
    const queueName = 'dream';
    await channel.assertQueue(queueName, { durable: false });

    this.channel = channel;

    channel.prefetch(1);
    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        console.log(`Received message: ${msg.content.toString()}`);

        const message = JSON.parse(msg.content.toString());
        console.log(message.user, message.name, message.question, message.text);

        await this.dreamRepository.create({
          userId: message.user.id,
          name: message.name,
          question: message.question,
          text: message.text
        });

        this.socketService.send(`${message.user.email}`, `Your ${message.name} dream interpretation`);

        channel.ack(msg);
      }
    })

    console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`);
  }

  getChannel(): any {
    return this.channel;
  }
}
