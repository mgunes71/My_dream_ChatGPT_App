import {
  AllowNull,
  AutoIncrement, BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table
} from "sequelize-typescript";
import { DreamEntity } from "./dream.model";

@Table({
  tableName: 'users',
})
@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Scopes(() => ({
  withPassword: {
    attributes: {
      include: ['password'],
    },
  },
}))
export class UserEntity extends Model<UserEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => DreamEntity, {foreignKey: 'userId', as: 'pages'})
  pages: DreamEntity[];
}
