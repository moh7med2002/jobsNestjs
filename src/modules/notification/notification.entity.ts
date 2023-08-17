import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table
export class Notification extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  content: string;

  @ForeignKey(() => User)
  @Column({})
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
