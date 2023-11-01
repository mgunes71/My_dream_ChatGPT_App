import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from "./models/user.model";
import { DreamEntity } from "./models/dream.model";


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [UserEntity, DreamEntity],
      autoLoadModels: true,

      // define: {
      //   defaultScope: {
      //     nest: true,
      //     raw: true,
      //   },
      // },

      // sync: {
      //   alter: true,
      // },
    }),
  ],
  exports: [SequelizeModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
