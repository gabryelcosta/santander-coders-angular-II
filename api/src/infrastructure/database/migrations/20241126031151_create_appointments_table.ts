import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('appointments', (table) => {
    table.increments('id').primary();
    table.integer('patient_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('doctor_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('schedule_id').unsigned().notNullable().references('id').inTable('schedules');
    table.timestamp('appointment_time').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('appointments');
}