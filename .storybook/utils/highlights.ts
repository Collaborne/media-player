export const highlightColors = [
	'#08E8E8',
	'#F4DF82',
	'#00CF80',
	'#FF6347',
	'#F5AB35',
	'#C67FE8',
	'#C9874F',
	'#EDAEEB',
	'#89CFF0',
	'#FC6399',
	'#7FA8F0',
	'#DAF7A6',
	'#EA99FF',
];

type PickRandomItem<T> = (array: T[]) => T;

export const pickRandomItem: PickRandomItem<string> = array =>
	array[Math.round(Math.random() * (array.length - 1))];
