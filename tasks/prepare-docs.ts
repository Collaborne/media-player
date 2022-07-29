import { resolve } from 'path';
import { promises as fsPromises } from 'fs';

// When building new documentation, version is not removed from previous doc update
// so need to run this script before npm run build:docs
const deleteVersionTag = async () => {
	const readmeFilePath = resolve(__dirname, '..', 'README.md');
	const readmeFile = await fsPromises.readFile(readmeFilePath, 'utf-8');
	const regex = /(.*)modules.md\)$/gm;
	const formatString = (str: string) => str.replace(regex, '');
	const newReadme = formatString(readmeFile);
	await fsPromises.writeFile(readmeFilePath, newReadme);
};
deleteVersionTag();
