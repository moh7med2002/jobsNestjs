import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { Price } from '../price/price.entity';
import { Job } from '../job/job.entity';
import { Feedback } from '../feedback/feedback.entity';

@Table
export class JobImplement extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  duration: number;

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

  @HasOne(() => Feedback)
  feedback: Feedback;
}
