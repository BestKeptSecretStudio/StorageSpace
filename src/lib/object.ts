type Key<T> = keyof T;

export type Keys<T> = Key<T>[];

export type Entries<T> = {
	[K in Key<T>]: [K, T[K]];
}[Key<T>][];

export type Values<T> = {
	[K in Key<T>]: T[K];
}[Key<T>][];

export function keys<T extends object>(object: T): Keys<T> {
	return Object.keys(object) as Keys<T>;
}

export function entries<T extends object>(object: T): Entries<T> {
	return Object.entries(object) as Entries<T>;
}

export function values<T extends object>(object: T): Values<T> {
	return Object.values(object) as Values<T>;
}
