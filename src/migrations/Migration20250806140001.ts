import { Migration } from '@mikro-orm/migrations';

export class Migration20250806140001 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`projects\` drop column \`tokenDecimals\`;`);

    this.addSql(`alter table \`projects\` add \`websiteUrl\` text null default null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`projects\` drop column \`websiteUrl\`;`);

    this.addSql(`alter table \`projects\` add \`tokenDecimals\` int null default null;`);
  }

}
