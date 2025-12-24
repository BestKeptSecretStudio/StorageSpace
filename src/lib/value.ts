import type { PropertyValue } from "@/data/upgrades";

export type Comparator = "===" | "!==" | ">=" | "<=" | "<" | ">";

export type Mutator = "=" | "+" | "-" | "*" | "/";

type ComparatorTable = {
	[K in Comparator]: (a: PropertyValue, b: PropertyValue) => boolean;
};

type MutatorTable = {
	[K in Mutator]: (a: PropertyValue, b: PropertyValue) => PropertyValue;
};

export const MUTATOR_ORDER = ["=", "+", "-", "*", "/"] as const;

const COMPARATOR_TABLE: ComparatorTable = {
	"===": (left, right) => left === right,
	"!==": (left, right) => left !== right,
	">=": (left, right) => left >= right,
	"<=": (left, right) => left <= right,
	">": (left, right) => left > right,
	"<": (left, right) => left < right,
};

const MUTATOR_TABLE: MutatorTable = {
	"=": (_value, target) => target,
	"+": (value, target) => value + target,
	"-": (value, target) => value - target,
	"*": (value, target) => value * (1 + target),
	"/": (value, target) => value / (1 + target),
};

export function compare(
	value: PropertyValue,
	comparator: Comparator,
	target: PropertyValue,
): boolean {
	return COMPARATOR_TABLE[comparator](value, target);
}

export function mutate(
	value: PropertyValue,
	mutator: Mutator,
	target: PropertyValue,
): PropertyValue {
	return MUTATOR_TABLE[mutator](value, target);
}
