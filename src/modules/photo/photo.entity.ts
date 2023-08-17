import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { PersonalProject } from '../personalProject/personalProject.entity';

@Table
export class Photo extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  path: string;

  @ForeignKey(() => PersonalProject)
  @Column({})
  projectId: number;

  @BelongsTo(() => PersonalProject)
  project: PersonalProject;
}
