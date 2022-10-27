import { resolve } from 'path';
import { promises as fsPromises } from 'fs';
import packageJson from '../package.json';

const currentVersion = packageJson.version;
const packageName = packageJson.name;
// When building new documentation, version is not removed from previous doc update
// so need to run this script before npm run build:docs
const deleteVersionTag = async () => {
	const readmeFilePath = resolve(__dirname, '..', 'README.md');
	const readmeFile = await fsPromises.readFile(readmeFilePath, 'utf-8');
	const regex = /^.*video-player(.*)/;
	const formatString = (str: string) =>
		str.replace(regex, `# ${packageName} ${currentVersion}`);
	const newReadme = formatString(readmeFile);
	await fsPromises.writeFile(readmeFilePath, newReadme);
};
deleteVersionTag();
