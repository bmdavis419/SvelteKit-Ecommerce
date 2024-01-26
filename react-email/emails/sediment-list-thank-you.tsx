import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface SedimentListThankYouProps {
	key: string;
	email: string;
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:5173';

export const SedimentListThankYou = ({ key, email }: SedimentListThankYouProps) => {
	return (
		<Html>
			<Head />
			<Preview>Welcome to Sediment Art!</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src="https://res.cloudinary.com/insiderviz/image/upload/f_auto,q_auto/xpihugvw2rd4bg94vl4q"
								alt="Sediment Art"
								width="300"
								height="102"
								className="my-0 mx-auto"
							/>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							Welcome to Sediment Art! 🎨 Dive into a world of captivating natural art encased in
							glass.
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							For updates and inquiries, reach us at{' '}
							<Link href="mailto:support@sedimentart.com">support@sedimentart.com</Link>.
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							Let's create something extraordinary together!
						</Text>
						<Text className="text-black text-[12px] leading-[4px]">Best,</Text>
						<Text className="text-black text-[12px] leading-[4px]">Ben Davis</Text>
						<Text className="text-black text-[12px] leading-[4px]">Sediment Art Team</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Link
							className="text-[#666666] text-[12px] leading-[24px]"
							href={`${baseUrl}/auth/list/remove?key=${key}&email=${email}`}
						>
							unsubscribe
						</Link>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default SedimentListThankYou;
