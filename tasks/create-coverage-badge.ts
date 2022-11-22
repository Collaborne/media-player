import { readFile, writeFile } from 'fs';
import { get } from 'https';
import mkdirp from 'mkdirp';
import * as path from 'path';

const inputPath = path.resolve(
	__dirname,
	'..',
	'coverage',
	'coverage-summary.json',
);
const outputPath = path.resolve(__dirname, '..', 'coverage');

const getColor = (coverage: number) => {
	if (coverage < 80) {
		return 'red';
	}

	if (coverage < 90) {
		return 'yellow';
	}

	return 'brightgreen';
};

interface ReportData {
	total: number;
	covered: number;
	skipped: number;
	pct: number;
}
interface Report {
	lines: ReportData;
	statements: ReportData;
	functions: ReportData;
	branches: ReportData;
}
const reportKeys: Array<keyof Report> = [
	'lines',
	'statements',
	'functions',
	'branches',
];

type TotalReport = { total: Report };

const getBadge = (report: TotalReport, key: keyof Report) => {
	if (!(report && report.total && report.total[key])) {
		throw new Error('malformed coverage report');
	}

	const coverage =
		!report.total[key] || typeof report.total[key].pct !== 'number'
			? 0
			: report.total[key].pct;
	const color = getColor(coverage);
	const type = key === 'statements' ? 'coverage' : key;
	return `https://img.shields.io/badge/${type}-${coverage}${encodeURI(
		'%',
	)}-${color}.svg`;
};

const download = (url: string, cb: (...args: any) => void) => {
	get(url, res => {
		let file = '';
		res.on('data', chunk => {
			file += chunk;
		});
		res.on('end', () => cb(null, file));
	}).on('error', err => cb(err));
};

const writeBadgeInFolder = (key: keyof Report, res: any) => {
	writeFile(`${outputPath}/badge-${key}.svg`, res, 'utf8', writeError => {
		if (writeError) {
			throw writeError;
		}
	});
};

const getBadgeByKey = (report: TotalReport) => (key: keyof Report) => {
	const url = getBadge(report, key);
	download(url, (err, res) => {
		if (err) {
			throw err;
		}
		mkdirp.sync(outputPath);
		writeBadgeInFolder(key, res);
	});
};

readFile(`${inputPath}`, 'utf8', (err, res) => {
	if (err) {
		throw err;
	}

	const report = JSON.parse(res);
	reportKeys.forEach(getBadgeByKey(report));
});
