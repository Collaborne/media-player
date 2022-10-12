export type RequiredAndOptionalPick<
	T,
	K extends keyof T,
	U extends keyof T,
> = Required<Pick<T, K>> & Pick<T, U>;
