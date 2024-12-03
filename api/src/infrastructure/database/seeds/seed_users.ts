import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
await knex('users').del();
await knex('user_roles').del();

const hashedPassword = await bcrypt.hash('admin', 10);

await knex('users').insert([
    { id: 1, codUser: 'admin-001', login: 'admin', password: hashedPassword, username: 'SuperAdmin' },
]);

const userRolesCount = await knex('user_roles').count('id as count').first();

if (userRolesCount.count === 0) {
await knex('user_roles').insert([
    { user_id: 1, role_id: 1 },
]);
}
}