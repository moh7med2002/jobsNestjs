import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Proposal } from '../proposal/proposal.entity';

@Table
export class Feedback extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  rate: number;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  comment: string;

  @ForeignKey(() => Proposal)
  @Column({})
  proposalId: number;

  @BelongsTo(() => Proposal)
  proposal: Proposal;
}
