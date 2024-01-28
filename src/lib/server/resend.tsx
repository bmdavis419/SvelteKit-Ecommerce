import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import { SedimentListThankYou } from '$lib/emails/sediment-list-thank-you';
import { SedimentPurchaseThankYou } from '$lib/emails/sediment-purchase-thank-you';
import * as React from 'react';

export const resend = new Resend(env.RESEND_API_KEY);

export const sendThankYouListEmail = async (email: string, key: string) => {
	try {
		await resend.emails.send({
			from: 'no-reply@sedimentart.com',
			to: email,
			subject: 'Welcome to Sediment Art',
			react: <SedimentListThankYou email={email} unsubKey={key} />
		});
		console.log('sent');
	} catch (e) {
		console.log('error sending:', e);
	}
};

export const sendThankYouPurchaseEmail = async (email: string) => {
	try {
		await resend.emails.send({
			from: 'no-reply@sedimentart.com',
			to: email,
			subject: 'Sediment Art: Thank you for your order!',
			react: <SedimentPurchaseThankYou />
		});
		console.log('sent');
	} catch (e) {
		console.log('error sending:', e);
	}
};
