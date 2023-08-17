import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Conversation } from '../conversation/conversation.entity';

@Table
export class Message extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Conversation)
  @Column({})
  conversationId: number;

  @BelongsTo(() => Conversation)
  conversation: Conversation;

  @ForeignKey(() => User)
  @Column({})
  senderId: number;

  @BelongsTo(() => User)
  sender: User;
}
