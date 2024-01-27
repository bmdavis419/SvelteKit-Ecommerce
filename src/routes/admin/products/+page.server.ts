import { fetchAllProducts } from '$lib/server/data/products';
import { parse } from 'csv-parse';

export const load = async () => {
	const products = await fetchAllProducts(10, 0);

	return { products };
};

interface CSVRecord {
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
}

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const priceFile = formData.get('prices') as File;

		const csvData = await parseCSV(priceFile);

		csvData.forEach((d) => {
			console.log(d['Price ID'], ' ', d['Product ID'], ' ', d['Product Name']);
			// TODO: add to DB
		});

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
