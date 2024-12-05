import { Table, Column, Model, PrimaryKey, DataType, HasMany } from "sequelize-typescript";

import { Project } from "@/features/project/project.entity";

@Table
export class Currency extends Model {
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
    type: DataType.INTEGER
  })
  chainId: number;

  @Column({
    type: DataType.STRING,
  })
  chain: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
      type: DataType.BOOLEAN,
      defaultValue: true
  })
  isActive: boolean;

  // Relationships
  @HasMany(() => Project)
  projects: Project[];
}
