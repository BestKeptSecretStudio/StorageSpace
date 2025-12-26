import { UNITS, UNIT_IDS, type Property, type UnitID } from "@/data/storage";
import { type Effect } from "@/data/upgrades";
import { mutate } from "@/lib/value";
import { $units } from "@/state/$storage";
import { $effects } from "@/state/$upgrades";

/** Path to a specific unit's property */
export type UnitPropertyPath = [property: Property, unit: UnitID];

/** Path to an aggregate property (all units) */
export type AggregatePropertyPath = [property: Property];

/** Valid property paths */
export type PropertyPath = UnitPropertyPath | AggregatePropertyPath;

/**
 * Check if effect key is a prefix of the target path.
 * `["area"]` matches `["area"]` and `["area", "shed"]`
 * `["area", "shed"]` matches only `["area", "shed"]`
 */
function isPrefix(key: string[], path: string[]): boolean {
	if (key.length > path.length) return false;

	return key.every((segment, index) => segment === path[index]);
}

/**
 * Get raw value from {@link UNITS} for a base property.
 * Only works for base properties (area, rate), not derived (income).
 */
function getBaseValue(path: UnitPropertyPath): number {
	const [property, unit] = path;

	if (property === "income" || property === "count")
		throw new Error(
			`\`${property}\` is a derived property, use \`getValue()\` instead`,
		);

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
 * Get the modified per-unit value for a property.
 * Does not multiply by count - returns value for a single unit.
 *
 * For base properties (area, rate):
 *   Fetches base value, applies matching effects.
 *
 * For derived properties (income):
 *   Computes area × rate, then applies income effects.
 */
export function getUnitValue(path: UnitPropertyPath): number {
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

	const base = getBaseValue(path);
	const effects = getMatchingEffects(path);

	return applyEffects(base, effects);
}

/**
 * Get the total value for a property across owned units.
 *
 * For unit-specific path (e.g., ["area", "shed"]):
 *   Returns getValue(path) × count of that unit.
 *
 * For aggregate path (e.g., ["area"]):
 *   Sums getTotalValue for each unit type.
 */
export function getTotalValue(path: PropertyPath): number {
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
 *
 * For unit-specific path (e.g., ["area", "shed"]):
 *   Returns the per-unit value (not multiplied by count).
 *
 * For aggregate path (e.g., ["area"]):
 *   Returns the total value across all owned units.
 */
export function getValue(path: PropertyPath): number {
	return path.length === 2 ? getUnitValue(path) : getTotalValue(path);
}
