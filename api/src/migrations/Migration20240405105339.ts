import { Migration } from '@mikro-orm/migrations';

export class Migration20240405105339 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Employees" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "join" date not null, "birth" date not null, "salary" int not null, "title" varchar(255) not null, "department" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "Employees" cascade;');
  }

}
