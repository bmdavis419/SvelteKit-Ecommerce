import { drizzle as mysqlDrizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	database: 'sedimentart',
	password: 'password'
});

export const db = mysqlDrizzle(connection, { schema, mode: 'default' });
