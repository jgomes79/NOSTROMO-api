import { Migration } from '@mikro-orm/migrations';

export class Migration20251014181633 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`projects\` modify \`amountToRaise\` float default null, modify \`tokensSupply\` float default null, modify \`tokensForSale\` float default null, modify \`unlockTokensTGE\` float default null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`projects\` modify \`amountToRaise\` numeric(10,0) default null, modify \`tokensSupply\` int default null, modify \`tokensForSale\` int default null, modify \`unlockTokensTGE\` double default null;`);
  }

}
