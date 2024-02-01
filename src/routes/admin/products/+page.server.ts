import { ensureAdmin } from '$lib/server/auth';
import { fetchAllProducts } from '$lib/server/data/products';
import { db } from '$lib/server/db/index.js';
import { product, productSize } from '$lib/server/db/schema.js';
import { parse } from 'csv-parse';
import { generateId } from 'lucia';

export const load = async ({ locals }) => {
	ensureAdmin(locals);

	const products = await fetchAllProducts(10, 0);

	return { products };
};

type CSVRecord = {
	'Price ID': string;
	'Product ID': string;
	'Product Name': string;
	'Product Statement Descriptor': string;
	'Product Tax Code': string;
	Description: string;
	'Created (UTC)': string;
	Amount: number;
	Currency: string;
	Interval: string;
	'Interval Count': number;
	'Usage Type': string;
	'Aggregate Usage': string;
	'Billing Scheme': string;
	'Trial Period Days': number;
	'Tax Behavior': string;
	Code: string;
	Width: number;
	Height: number;
};

export const actions = {
	default: async (event) => {
		ensureAdmin(event.locals);

		const formData = await event.request.formData();

		const priceFile = formData.get('prices') as File;

		const csvData = await parseCSV(priceFile);

		const createdProducts: {
			name: string;
			id: string;
		}[] = [];

		for (let i = 0; i < csvData.length; i++) {
			const entry = csvData[i];

			const entryProductName = entry['Product Name'].split(',')[0] ?? '';

			const productIdx = createdProducts.findIndex((v) => v.name === entryProductName);
			if (productIdx >= 0) {
				await db.insert(productSize).values({
					name: entry['Product Name'].split(',')[1].trim() ?? '',
					price: entry.Amount * 100,
					stripePriceId: entry['Price ID'],
					stripeProductId: entry['Product ID'],
					productId: createdProducts[productIdx].id,
					width: entry.Width,
					height: entry.Height,
					code: entry.Code
				});
			} else {
				// create the product
				const nId = generateId(40);

				await db.insert(product).values({
					id: nId,
					name: entryProductName,
					desc: ''
				});

				createdProducts.push({
					name: entryProductName,
					id: nId
				});

				await db.insert(productSize).values({
					width: entry.Width,
					height: entry.Height,
					code: entry.Code,
					name: entry['Product Name'].split(',')[1].trim() ?? '',
					price: entry.Amount * 100,
					stripePriceId: entry['Price ID'],
					stripeProductId: entry['Product ID'],
					productId: nId
				});
			}
		}

		return { success: true };
	}
};

// TY GPT
async function parseCSV(csvFile: File): Promise<CSVRecord[]> {
	return new Promise((resolve, reject) => {
		const results: CSVRecord[] = [];

		// Use a TextDecoder to convert Uint8Array to strings
		const textDecoder = new TextDecoder('utf-8');

		const csvParseStream = parse({ delimiter: ',', columns: true });

		const reader = csvFile.stream().getReader();

		const readChunk = async () => {
			const { done, value } = await reader.read();
			if (done) {
				csvParseStream.end();
			} else {
				const chunkString = textDecoder.decode(value);
				csvParseStream.write(chunkString);
				readChunk();
			}
		};

		reader.read().then(async ({ done, value }) => {
			if (!done) {
				const chunkString = textDecoder.decode(value);
				csvParseStream.write(chunkString);
				readChunk();
			}
		});

		csvParseStream.on('readable', () => {
			let record;
			while ((record = csvParseStream.read())) {
				results.push(record as CSVRecord);
			}
		});

		csvParseStream.on('error', (error) => {
			reject(error);
		});

		csvParseStream.on('end', () => {
			resolve(results);
		});
	});
}
