import { Injectable } from "@nestjs/common";
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private channel: any;
  constructor() {}

  async Initialize() {
    const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@localhost:${process.env.RABBITMQ_PORT}`);
    const channel = await connection.createChannel();
    const queueName = 'dream';
    await channel.assertQueue(queueName, { durable: false });

    this.channel = channel;

    console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`);
  }

  getChannel(): any {
    return this.channel;
  }
}
