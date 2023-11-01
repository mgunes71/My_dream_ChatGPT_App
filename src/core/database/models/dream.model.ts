import {
  AllowNull,
  AutoIncrement, BelongsTo,
  Column,
  DataType, ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

import { UserEntity } from "./user.model";

@Table({
  tableName: 'dreams'
})

export class DreamEntity extends Model<DreamEntity>{
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.TEXT)
  text: string;

  @ForeignKey(() => UserEntity)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => UserEntity, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
