import {
    Table,
    Column,
    Model,
    HasMany,
    PrimaryKey,
    DataType,
} from 'sequelize-typescript';
  
import { User } from '@/features/user/user.entity';
  
@Table
export class Tier extends Model {
    // Basic Information
    @PrimaryKey
    @Column({
      type: DataType.INTEGER,
    })
    id: number;
  
    @Column({
      type: DataType.STRING,
    })
    name: string;

    @Column({
      type: DataType.INTEGER,
      defaultValue: 0
    })
    stakeAmount: number;

    @Column({
      type: DataType.DOUBLE,
      defaultValue: 0
    })
    poolWeight: number;

    // Relationships
    @HasMany(() => User)
    users: User[];
}
  