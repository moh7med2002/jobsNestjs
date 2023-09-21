import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Scopes,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Photo } from '../photo/photo.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
}))
export class PersonalProject extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  description: string;

  @ForeignKey(() => User)
  @Column({})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Photo)
  photos: Photo[];
}
