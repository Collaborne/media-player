import * as fs from 'node:fs';
import * as path from 'node:path';

import lodash from 'lodash';
import { mkdirpSync } from 'mkdirp';

const { merge } = lodash;

const LOCALES_DIRS = [path.resolve(import.meta.dirname, '../locales')];
const BUILD_LOCALES_DIR = process.argv[2];
if (!BUILD_LOCALES_DIR) {
	throw new Error(`Usage: ${process.argv[1]} output-directory`);
}

type LocaleSource = Record<string, { message: unknown }>;

function readFile(filename: string): LocaleSource {
	const content = fs.readFileSync(filename, 'utf8');
	return JSON.parse(content) as LocaleSource;
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
			} catch (error: unknown) {
				const message = error instanceof Error ? error.message : String(error);
				console.error(`Cannot flatten file ${file}: ${message}`);
				throw error;
			}
		}, {});
}

const flattened = LOCALES_DIRS.reduce(
	(acc, dir) => {
		const flattenedDir = flattenDir(dir);
		return merge(acc, flattenedDir);
	},
	{} as { [key: string]: unknown },
);

mkdirpSync(BUILD_LOCALES_DIR);
const locales = Object.keys(flattened);
locales.forEach(locale => {
	const content = flattened[locale];
	fs.writeFileSync(
		path.resolve(BUILD_LOCALES_DIR, `${locale}.json`),
		JSON.stringify(content),
	);
});
