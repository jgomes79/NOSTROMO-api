import { Migration } from '@mikro-orm/migrations';

export class Migration20251022155225 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`projects\` add \`votingStartDate\` datetime null default null, add \`votingEndDate\` datetime null default null, add \`publishDate\` datetime null default null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`projects\` drop column \`votingStartDate\`, drop column \`votingEndDate\`, drop column \`publishDate\`;`);
  }

}
