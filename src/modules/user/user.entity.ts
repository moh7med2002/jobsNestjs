import {
  Column,
  Table,
  Model,
  DataType,
  HasMany,
  Scopes,
} from 'sequelize-typescript';
import { UserRole } from 'src/constants/enums';
import { Job } from '../job/job.entity';
import { PersonalProject } from '../personalProject/personalProject.entity';
import { Notification } from '../notification/notification.entity';
import { JobImplement } from '../jobImplement/jobImplement.entity';
import { Conversation } from '../conversation/conversation.entity';
import { Message } from '../message/message.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
}))
export class User extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    unique: true,
  })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  country: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  biography: string;

  @Column({
    type: DataType.ENUM(UserRole.BUYER, UserRole.SELLER),
    defaultValue: UserRole.BUYER,
  })
  role: UserRole;

  @HasMany(() => Job)
  jobs: Job[];

  @HasMany(() => JobImplement)
  jobImplements: JobImplement[];

  @HasMany(() => PersonalProject)
  projects: PersonalProject[];

  @HasMany(() => Notification)
  notifications: Notification[];

  @HasMany(() => Conversation)
  conversations: Conversation[];

  @HasMany(() => Message)
  messages: Message[];
}
