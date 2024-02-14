import { v2 as cloudinary } from 'cloudinary';
import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { paramsToSign } = body;
	try {
		const signature = cloudinary.utils.api_sign_request(paramsToSign, env.CLOUDINARY_API_SECRET);
		return json({ signature });
	} catch (e) {
		console.error(e);
		throw error(500, (e as Error).message);
	}
};
