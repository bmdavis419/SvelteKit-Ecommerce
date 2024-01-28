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
	unsubKey: string;
	email: string;
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:5173';

export const SedimentListThankYou = ({ unsubKey, email }: SedimentListThankYouProps) => {
	return (
		<Html>
			<Head />
			<Preview>Welcome to Sediment Art!</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src="https://res.cloudinary.com/insiderviz/image/upload/f_auto,q_auto/ly9xqkjkn8rat1l3lxex"
								alt="Sediment Art"
								width="300"
								height="102"
								className="my-0 mx-auto"
							/>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">Welcome to Sediment Art! </Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Dive into a world of captivating natural art, of rocks expertly photographed that are
							millions of years old, encased in glass.
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							We'll keep you updated for when new drops come and new images are made available!
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							For inquiries, reach us at{' '}
							<Link href="mailto:bmd.yt.channel@gmail.com">bmd.yt.channel@gmail.com</Link>
						</Text>

						<Text className="text-black text-[12px] leading-[4px] pt-4">Best,</Text>
						<Text className="text-black text-[12px] leading-[4px] ml-1">Ben Davis</Text>
						<Text className="text-black text-[12px] leading-[4px] ml-1 italic">
							Sediment Art Team
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Link
							className="text-[#666666] text-[12px] leading-[24px]"
							href={`${baseUrl}/auth/list/remove?key=${unsubKey}&email=${email}`}
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
