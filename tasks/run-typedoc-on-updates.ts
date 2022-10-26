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

const currentBranch =
	executeGitCommand('git rev-parse --abbrev-ref HEAD')?.[0] ?? '';
const committedFilePaths = executeGitCommand(
	`git diff --name-only origin/${currentBranch} $(git merge-base origin/${currentBranch} origin/main)`,
);

const committedRelativeFilePaths = resolveFilePaths(committedFilePaths);

const TYPEDOC_DIR = path.resolve(__dirname, '../typedoc.json');

const typeDocInput: string[] = readFile(TYPEDOC_DIR)?.entryPoints ?? [];

const entryPointFiles = typeDocInput.flatMap(entryPoint =>
	glob(entryPoint, { realpath: true }),
);

const changedFiles = entryPointFiles.filter(file =>
	committedRelativeFilePaths.includes(file),
);
const shouldRunDocUpdate = changedFiles.length > 0;

if (shouldRunDocUpdate) {
	console.group('Recreating docs due to changes in');
	console.log(changedFiles);
	console.groupEnd();
	execSync('typedoc');
	process.exit(0);
} else {
	console.log('No pending updates for Typedoc ');
}
