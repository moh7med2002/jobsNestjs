import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { JobImplement } from '../jobImplement/jobImplement.entity';

@Table
export class Feedback extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  rate: number;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  comment: string;

  @ForeignKey(() => JobImplement)
  @Column({})
  job_implementId: number;

  @BelongsTo(() => JobImplement)
  job_implement: JobImplement;
}
