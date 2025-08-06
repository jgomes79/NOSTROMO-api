import { Migration } from '@mikro-orm/migrations';

export class Migration20250806161356 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`projects\` add \`smartContractId\` int null default null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`projects\` drop column \`smartContractId\`;`);
  }

}
