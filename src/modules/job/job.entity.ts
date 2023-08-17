import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { JobLevel, JobStatus } from 'src/constants/enums';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { Price } from '../price/price.entity';
import { JobImplement } from '../jobImplement/jobImplement.entity';
import { Conversation } from '../conversation/conversation.entity';

@Table
export class Job extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  duration: number;

  @Column({
    type: DataType.ENUM(JobStatus.OPEN, JobStatus.CLOSE),
    defaultValue: JobStatus.OPEN,
  })
  status: JobStatus;

  @Column({
    type: DataType.ENUM(
      JobLevel.OFFERS,
      JobLevel.IMPLEMENTATION,
      JobLevel.DELIVERED,
    ),
    defaultValue: JobLevel.OFFERS,
  })
  level: JobLevel;

  @ForeignKey(() => Category)
  @Column({})
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => User)
  @Column({})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasOne(() => Price)
  price: Price;

  @HasMany(() => JobImplement)
  implements: JobImplement[];

  @HasMany(() => Conversation)
  conversations: Conversation[];
}
