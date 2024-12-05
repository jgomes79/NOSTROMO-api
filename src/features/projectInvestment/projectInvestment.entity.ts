import {
    Table,
    Column,
    Model,
    BelongsTo,
    ForeignKey,
    PrimaryKey,
    DataType,
} from 'sequelize-typescript';
  
import { Currency } from '@/features/currency/currency.entity';
import { Project } from '@/features/project/project.entity';
import { User } from '@/features/user/user.entity';
  
@Table
export class ProjectInvestment extends Model {
    // Information
    @PrimaryKey
    @Column({
      type: DataType.INTEGER,
    })
    id: number;
  
    @Column({
      type: DataType.DOUBLE,
    })
    amount: number;
  
    // Relationships
    @ForeignKey(() => Currency)
    @Column({
      type: DataType.INTEGER
    })
    currencyId: number;
  
    @BelongsTo(() => Currency)
    currency: Currency;

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
  