import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('schedules', (table) => {
    table.increments('id').primary();
    table.integer('doctor_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('specialty_id').unsigned().notNullable().references('id').inTable('specialties');
    table.date('date').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('schedules');
}