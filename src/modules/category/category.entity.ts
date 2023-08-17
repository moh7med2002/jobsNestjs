import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { Job } from '../job/job.entity';

@Table
export class Category extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    unique: true,
  })
  title: string;

  @HasMany(() => Job)
  jobs: Job[];
}
