import { Migration } from '@mikro-orm/migrations';

export class Migration20250730161548 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`project-votes\` drop foreign key \`project-votes_tierId_foreign\`;`);

    this.addSql(`alter table \`users\` drop foreign key \`users_tierId_foreign\`;`);

    this.addSql(`drop table if exists \`tiers\`;`);

    this.addSql(`alter table \`users\` drop index \`users_tierId_index\`;`);
    this.addSql(`alter table \`users\` drop column \`tierId\`;`);

    this.addSql(`alter table \`project-votes\` drop index \`project-votes_tierId_index\`;`);
    this.addSql(`alter table \`project-votes\` drop column \`tierId\`;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table \`tiers\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`description\` varchar(255) not null, \`stakeAmount\` double not null default 0, \`poolWeight\` double not null default 0, \`benefits\` varchar(255) not null, \`createdAt\` datetime not null, \`updatedAt\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`alter table \`project-votes\` add \`tierId\` int unsigned not null;`);
    this.addSql(`alter table \`project-votes\` add constraint \`project-votes_tierId_foreign\` foreign key (\`tierId\`) references \`tiers\` (\`id\`) on update cascade on delete no action;`);
    this.addSql(`alter table \`project-votes\` add index \`project-votes_tierId_index\`(\`tierId\`);`);

    this.addSql(`alter table \`users\` add \`tierId\` int unsigned not null;`);
    this.addSql(`alter table \`users\` add constraint \`users_tierId_foreign\` foreign key (\`tierId\`) references \`tiers\` (\`id\`) on update cascade on delete no action;`);
    this.addSql(`alter table \`users\` add index \`users_tierId_index\`(\`tierId\`);`);
  }

}
