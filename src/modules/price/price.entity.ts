import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Job } from '../job/job.entity';

@Table
export class Price extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  min: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  max: number;

  @ForeignKey(() => Job)
  @Column({})
  jobId: number;

  @BelongsTo(() => Job)
  job: Job;
}
