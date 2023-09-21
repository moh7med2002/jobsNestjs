import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { JobLevel, JobStatus } from 'src/constants/enums';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { Price } from '../price/price.entity';
import { Proposal } from '../proposal/proposal.entity';

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
  creatorId: number;

  @BelongsTo(() => User, 'creatorId')
  creatorUser: User;

  @HasOne(() => Price)
  price: Price;

  @HasMany(() => Proposal)
  proposals: Proposal[];
}
