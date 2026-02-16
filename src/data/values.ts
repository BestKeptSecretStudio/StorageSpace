import {
	GLOBAL_PROPERTIES,
	UNITS,
	UNIT_IDS,
	type DerivedProperty,
	type GlobalProperty,
	type UnitID,
	type UnitProperty,
} from "@/data/storage";
import { type Effect } from "@/data/upgrades";
import { mutate } from "@/lib/value";
import { $money, $totalMoney } from "@/state/$money";
import { $units } from "@/state/$storage";
import { $effects } from "@/state/$upgrades";

/** Path to a specific unit's base property. */
export type UnitPropertyPath = [property: UnitProperty, unit: UnitID];

/** Path to a per-unit value. */
type UnitValuePath = [property: UnitProperty | DerivedProperty, unit: UnitID];

/** Path to an aggregate property. */
export type AggregatePropertyPath = [property: UnitProperty | DerivedProperty];

export type MoneySelector = "current" | "total";

export type GlobalPropertyPath = ["money", MoneySelector];

/**
 * Type guard to check if a path is a global property path.
 */
function isGlobalPropertyPath(path: PropertyPath): path is GlobalPropertyPath {
	return GLOBAL_PROPERTIES.includes(path[0] as GlobalProperty);
}

/** Valid property paths */
export type PropertyPath =
	| UnitValuePath
	| AggregatePropertyPath
	| GlobalPropertyPath;

/**
 * Check if effect key is a prefix of the target path.
 */
function isPrefix(key: string[], path: string[]): boolean {
	if (key.length > path.length) return false;

	return key.every((segment, index) => segment === path[index]);
}

export function getRequirementLabel(key: PropertyPath): string {
	const [property, target] = key;

	if (property === "money") {
		return target === "total" ? "Total earned" : "Money";
	}

	if (target) {
		return `${UNITS[target as UnitID].name} ${property}`;
	}

	return `Total ${property}`;
}

/**
 * Get raw value from {@link UNITS} for a base property.
 */
function getBaseValue(path: UnitPropertyPath): number {
	const [property, unit] = path;

	return UNITS[unit][property];
}

/**
 * Get all effects whose key is a prefix of the given path.
 * Effects are already sorted by mutator order from {@link $effects}.
 */
function getMatchingEffects(path: PropertyPath): Effect[] {
	return $effects.get().filter((effect) => isPrefix(effect.key, path));
}

/**
 * Apply effects sequentially to a value.
 */
function applyEffects(value: number, effects: Effect[]): number {
	return effects.reduce(
		(accumulator, effect) =>
			mutate(accumulator, effect.mutator, effect.value),
		value,
	);
}

/**
 * Get the value of a global property.
 */
export function getGlobalValue(path: GlobalPropertyPath): number {
	const [property, selector] = path;

	if (property === "money") {
		if (selector === "current") return $money.get();
		if (selector === "total") return $totalMoney.get();

		throw new Error(`Unknown money selector: ${selector as string}`);
	}

	throw new Error(`Unknown global property: ${property as string}`);
}

/**
 * Get the modified per-unit value for a property. Returns value for a single unit. Use {@link getTotalValue()} to get values for all units of a type.
 */
export function getUnitValue(path: UnitValuePath): number {
	const [property, unit] = path;

	if (property === "income") {
		const area = getUnitValue(["area", unit]);
		const rate = getUnitValue(["rate", unit]);
		const effects = getMatchingEffects(path);

		return applyEffects(area * rate, effects);
	}

	if (property === "count") {
		return $units.get()[unit].count;
	}

	const base = getBaseValue([property, unit]);
	const effects = getMatchingEffects(path);

	return applyEffects(base, effects);
}

/**
 * Get the total value for a property across owned units. Aggregate values are provided for all units combined.
 */
export function getTotalValue(
	path: UnitValuePath | AggregatePropertyPath,
): number {
	const [property, unit] = path;

	if (unit) {
		const value = getUnitValue([property, unit]);
		const count = $units.get()[unit].count;

		return value * count;
	}

	return UNIT_IDS.reduce(
		(accumulator, id) => accumulator + getTotalValue([property, id]),
		0,
	);
}

/**
 * Get value for a property path.
 */
export function getValue(path: PropertyPath): number {
	if (isGlobalPropertyPath(path)) return getGlobalValue(path);

	return getTotalValue(path);
}
