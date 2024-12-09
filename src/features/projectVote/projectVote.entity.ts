import {
    Table,
    Column,
    Model,
    BelongsTo,
    ForeignKey,
    PrimaryKey,
    DataType,
} from 'sequelize-typescript';
  
import { Project } from '@/features/project/project.entity';
import { User } from '@/features/user/user.entity';
  
@Table
export class ProjectVote extends Model {
    // Information
    @PrimaryKey
    @Column({
      type: DataType.INTEGER,
    })
    id: number;
  
    @Column({
      type: DataType.BOOLEAN,
    })
    vote: boolean;
  
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
  