import { Migration } from '@mikro-orm/migrations';

export class Migration20250806172400 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`projects\` modify \`startDate\` datetime default null, modify \`TGEDate\` datetime default null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`projects\` modify \`startDate\` date default null, modify \`TGEDate\` date default null;`);
  }

}
