import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { isArray } from 'lodash';
import { sync as glob } from 'glob';

function readFile(filename: string): any {
	const content = fs.readFileSync(filename, 'utf8');
	return JSON.parse(content);
}

function executeGitCommand(command: string) {
	return execSync(command)
		.toString('utf8')
		.replace(/[\n\r\s]+$/, '')
		.split('\n');
}

const resolveFilePaths = (paths?: unknown) => {
	if (isArray(paths)) {
		return (paths ?? []).map((fileDir: string) =>
			path.resolve(__dirname, '..', fileDir),
		);
	}
	console.error('Paths should be array');
	return [];
};

const committedFilePaths = executeGitCommand(
	'git diff --name-only origin/main',
);

const committedRelativeFilePaths = resolveFilePaths(committedFilePaths);

const TYPEDOC_DIR = path.resolve(__dirname, '../typedoc.json');

const typeDocInput: string[] = readFile(TYPEDOC_DIR)?.entryPoints ?? [];

const getDocumentedFiles = () => {
	const entryRelativeFiles: string[] = [];
	typeDocInput.forEach(entryPoint => {
		const files = glob(entryPoint, { realpath: true });
		entryRelativeFiles.push(...files);
	});

	return entryRelativeFiles;
};

const documentedFiles = getDocumentedFiles();

let shouldRunDocUpdate = false;
const fileUpdated: string[] = [];

documentedFiles.forEach(file => {
	if (committedRelativeFilePaths.includes(file)) {
		shouldRunDocUpdate = true;
		fileUpdated.push(file);
	}
});

if (shouldRunDocUpdate) {
	console.log(`Creating new docs due to changes in ${fileUpdated.toString()}`);
	execSync('typedoc');

	process.exit(0);
}
console.log('No pending updates for Typedoc ');
