import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Job } from '../job/job.entity';
import { Feedback } from '../feedback/feedback.entity';
import { ProposalStatus } from 'src/constants/enums';

@Table
export class Proposal extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  duration: number;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  description: string;

  @Column({
    type: DataType.ENUM(
      ProposalStatus.ACCEPT,
      ProposalStatus.REJECT,
      ProposalStatus.PENDING,
    ),
    defaultValue: ProposalStatus.PENDING,
  })
  status: ProposalStatus;

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
