import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db } from '../db';
import { user } from '../db/schema';
import { eq } from 'drizzle-orm';

export const createUser = async (data: {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}) => {
	// hash password and create id
	const hashedPassword = await new Argon2id().hash(data.password);
	const userId = generateId(15);

	// create user in db
	await db.insert(user).values({
		email: data.email,
		firstName: data.first_name,
		lastName: data.last_name,
		hashedPassword,
		id: userId,
		isAdmin: false,
		stripeCustomerId: ''
	});

	return userId;
};

export const getUserForSignIn = async (email: string) => {
	const users = await db
		.select({
			id: user.id,
			hashedPassword: user.hashedPassword
		})
		.from(user)
		.where(eq(user.email, email));

	if (users.length === 0) {
		return null;
	}

	return users[0];
};
