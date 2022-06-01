import * as fs from 'fs';
import * as path from 'path';

import { merge } from 'lodash';
import mkdirp from 'mkdirp';

const LOCALES_DIRS = [path.resolve(__dirname, '../locales')];
const BUILD_LOCALES_DIR = process.argv[2];
if (!BUILD_LOCALES_DIR) {
	throw new Error(`Usage: ${process.argv[1]} output-directory`);
}

function readFile(filename: string): any {
	const content = fs.readFileSync(filename, 'utf8');
	return JSON.parse(content);
}

function flattenFile(filename: string) {
	const source = readFile(filename);
	return Object.keys(source).reduce((acc, key) => {
		const message = source[key].message;
		return Object.assign(acc, {
			[key]: message,
		});
	}, {});
}

function flattenDir(dirname: string) {
	const localeFiles = fs.readdirSync(dirname);
	return localeFiles
		.filter(file => /.json$/.test(file))
		.reduce((acc, file) => {
			try {
				const flattenedLocale = flattenFile(path.resolve(dirname, file));

				const locale = file.replace('.json', '');
				return Object.assign(acc, {
					[locale]: flattenedLocale,
				});
			} catch (e: any) {
				console.error(`Cannot flatten file ${file}: ${e.message}`);
				throw e;
			}
		}, {});
}

const flattened = LOCALES_DIRS.reduce((acc, dir) => {
	const flattenedDir = flattenDir(dir);
	return merge(acc, flattenedDir);
}, {} as { [key: string]: unknown });

mkdirp.sync(BUILD_LOCALES_DIR);
const locales = Object.keys(flattened);
locales.forEach(locale => {
	const content = flattened[locale];
	fs.writeFileSync(
		path.resolve(BUILD_LOCALES_DIR, `${locale}.json`),
		JSON.stringify(content),
	);
});
