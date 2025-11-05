import { Migration } from '@mikro-orm/migrations';

export class Migration20251103134717 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`currencies\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`chainId\` int not null, \`chain\` varchar(255) not null, \`address\` varchar(255) null, \`isActive\` tinyint(1) not null default true, \`createdAt\` datetime not null, \`updatedAt\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`users\` (\`id\` int unsigned not null auto_increment primary key, \`wallet\` varchar(255) not null, \`type\` varchar(255) not null default 'user', \`createdAt\` datetime not null, \`updatedAt\` datetime not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`projects\` (\`id\` int unsigned not null auto_increment primary key, \`state\` int not null default 0, \`name\` varchar(255) not null, \`slug\` varchar(255) not null, \`email\` varchar(255) not null, \`description\` text null default null, \`photoUrl\` text null default null, \`bannerUrl\` text null default null, \`tokenImageUrl\` text null default null, \`vip\` tinyint(1) not null default false, \`whitepaperUrl\` text null default null, \`litepaperUrl\` text null default null, \`tokenomicsUrl\` text null default null, \`comments\` text null default null, \`votingStartDate\` datetime null default null, \`votingEndDate\` datetime null default null, \`amountToRaise\` float null default null, \`threshold\` numeric(10,0) null default null, \`startDate\` datetime null default null, \`tokensSupply\` float null default null, \`tokensForSale\` float null default null, \`tokenName\` text null default null, \`TGEDate\` datetime null default null, \`unlockTokensTGE\` float null default null, \`cliff\` int null default null, \`vestingDays\` int null default null, \`instagramUrl\` text null default null, \`xUrl\` text null default null, \`discordUrl\` text null default null, \`telegramUrl\` text null default null, \`mediumUrl\` text null default null, \`websiteUrl\` text null default null, \`smartContractId\` int null default null, \`createdAt\` datetime not null, \`updatedAt\` datetime not null, \`ownerId\` int unsigned not null, \`currencyId\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`projects\` add index \`projects_ownerId_index\`(\`ownerId\`);`);
    this.addSql(`alter table \`projects\` add index \`projects_currencyId_index\`(\`currencyId\`);`);

    this.addSql(`create table \`project-votes\` (\`id\` int unsigned not null auto_increment primary key, \`vote\` tinyint(1) not null, \`createdAt\` datetime not null, \`updatedAt\` datetime not null, \`userId\` int unsigned not null, \`projectId\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`project-votes\` add index \`project-votes_userId_index\`(\`userId\`);`);
    this.addSql(`alter table \`project-votes\` add index \`project-votes_projectId_index\`(\`projectId\`);`);

    this.addSql(`create table \`project-registrations\` (\`id\` int unsigned not null auto_increment primary key, \`createdAt\` datetime not null, \`updatedAt\` datetime not null, \`userId\` int unsigned not null, \`projectId\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`project-registrations\` add index \`project-registrations_userId_index\`(\`userId\`);`);
    this.addSql(`alter table \`project-registrations\` add index \`project-registrations_projectId_index\`(\`projectId\`);`);

    this.addSql(`create table \`project-investments\` (\`id\` int unsigned not null auto_increment primary key, \`amount\` double not null, \`createdAt\` datetime not null, \`updatedAt\` datetime not null, \`projectId\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`project-investments\` add index \`project-investments_projectId_index\`(\`projectId\`);`);

    this.addSql(`alter table \`projects\` add constraint \`projects_ownerId_foreign\` foreign key (\`ownerId\`) references \`users\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`projects\` add constraint \`projects_currencyId_foreign\` foreign key (\`currencyId\`) references \`currencies\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`project-votes\` add constraint \`project-votes_userId_foreign\` foreign key (\`userId\`) references \`users\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`project-votes\` add constraint \`project-votes_projectId_foreign\` foreign key (\`projectId\`) references \`projects\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`project-registrations\` add constraint \`project-registrations_userId_foreign\` foreign key (\`userId\`) references \`users\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`project-registrations\` add constraint \`project-registrations_projectId_foreign\` foreign key (\`projectId\`) references \`projects\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`project-investments\` add constraint \`project-investments_projectId_foreign\` foreign key (\`projectId\`) references \`projects\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`projects\` drop foreign key \`projects_currencyId_foreign\`;`);

    this.addSql(`alter table \`projects\` drop foreign key \`projects_ownerId_foreign\`;`);

    this.addSql(`alter table \`project-votes\` drop foreign key \`project-votes_userId_foreign\`;`);

    this.addSql(`alter table \`project-registrations\` drop foreign key \`project-registrations_userId_foreign\`;`);

    this.addSql(`alter table \`project-votes\` drop foreign key \`project-votes_projectId_foreign\`;`);

    this.addSql(`alter table \`project-registrations\` drop foreign key \`project-registrations_projectId_foreign\`;`);

    this.addSql(`alter table \`project-investments\` drop foreign key \`project-investments_projectId_foreign\`;`);

    this.addSql(`drop table if exists \`currencies\`;`);

    this.addSql(`drop table if exists \`users\`;`);

    this.addSql(`drop table if exists \`projects\`;`);

    this.addSql(`drop table if exists \`project-votes\`;`);

    this.addSql(`drop table if exists \`project-registrations\`;`);

    this.addSql(`drop table if exists \`project-investments\`;`);
  }

}
