import type { IconKey } from "@/data/icons";
import { keys } from "@/lib/object";
import { type MetersSquare, type USD } from "@/types/aliases";

export type UnitID = (typeof UNIT_IDS)[number];

export interface StorageUnit {
	/** Unique freeform ID of the unit's type. Internal. Must match the key under which the type is stored in {@link STORAGE_UNITS}. */
	id: string;
	/** Name of the unit. Player-oriented. */
	name: string;
	/** Icon with which this type is decorated in the game's UI. */
	icon: IconKey;
	/** Cost of purchase of a single unit, in USD. Scales with each purchase. */
	cost: USD;
	/** Floor area of a single unit, in square meters. Modified by upgrades. Used to calculate income. */
	area: MetersSquare;
	/** Income rate per square meter, in USD. Modified by upgrades. Used to calculate income. */
	rate: USD;
}

export type UnitProperty = "cost" | "area" | "rate";
export type DerivedProperty = "income" | "count";
export type Property = UnitProperty | DerivedProperty;

export const STORAGE_UNITS = {
	/*
	 # HUSTLE STAGE
	 */

	shed: {
		// * this is meant to be a tiny shed, likely handmade in some backwater town in the South
		// * therefore its cost is low, and so is its area
		// * this size also makes size progression more meaningful atv the very start
		id: "shed",
		name: "Shed",
		icon: "shed",
		cost: 20,
		area: 1,
		rate: 1,
	},
	garage: {
		// > reference: https://shedsunlimited.net/garages/classic-1-car-prefab-garages/
		// fallback: https://web.archive.org/web/20251226152802/https://shedsunlimited.net/garages/classic-1-car-prefab-garages/
		id: "garage",
		name: "Garage",
		icon: "garage",
		cost: 10_000,
		area: 25 /* 14 by 18 ft = 252 sq ft = 23.41 m2 */,
		rate: 1,
	},
} satisfies Record<string, StorageUnit>;

export const UNIT_IDS = keys(STORAGE_UNITS);

export function getUnit(id: UnitID): StorageUnit {
	return STORAGE_UNITS[id];
}
