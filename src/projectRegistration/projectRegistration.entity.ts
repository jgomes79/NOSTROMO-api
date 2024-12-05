import {
    Table,
    Column,
    Model,
    BelongsTo,
    ForeignKey,
    PrimaryKey,
    DataType,
} from 'sequelize-typescript';
  
import { Project } from '@/project/project.entity';
import { User } from '@/user/user.entity';
  
@Table
export class ProjectRegistration extends Model {
    // Information
    @PrimaryKey
    @Column({
      type: DataType.INTEGER,
    })
    id: number;
  
    // Relationships
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
    })
    userId: number;
  
    @BelongsTo(() => User)
    user: User;
  
    @ForeignKey(() => Project)
    @Column({
      type: DataType.INTEGER,
    })
    projectId: number;
  
    @BelongsTo(() => Project)
    project: Project;
}
  