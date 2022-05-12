export const getTypedObjectKeys = <T>(o: T): Array<keyof T> =>
	Object.keys(o) as (keyof T)[];
