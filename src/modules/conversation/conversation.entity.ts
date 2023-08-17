import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Job } from '../job/job.entity';
import { Message } from '../message/message.entity';

@Table
export class Conversation extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Job)
  @Column({})
  jobId: number;

  @BelongsTo(() => Job)
  job: Job;

  @ForeignKey(() => User)
  @Column({})
  buyerId: number;

  @BelongsTo(() => User)
  buyer: User;

  @HasMany(() => Message)
  messages: Message[];
}
