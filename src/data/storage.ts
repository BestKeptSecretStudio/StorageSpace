import type { IconKey } from "@/data/icons";
import { keys } from "@/lib/object";
import { type MetersSquare, type USD } from "@/types/aliases";

export type UnitID = (typeof UNIT_IDS)[number];

export interface Unit {
	/** Unique freeform ID of the unit's type. Internal. Must match the key under which the type is stored in {@link UNITS}. */
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

export const UNITS = {
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
	lot: {
		// * platforms that host these sorts of deals don't allow scraping, so we can't provide a specific reference
		// * these values are based off of searching the American South for deals
		// * this unit is based on small multi-unit facilities placed around or next to strip malls
		id: "lot",
		name: "Strip Lot",
		// TODO
		icon: "garage",
		cost: 125_000,
		area: 150 /* 1_500 sq. ft. = 139.4 m2, rounded up */,
		rate: 1,
	},
	facility: {
		id: "facility",
		name: "Facility",
		// TODO
		icon: "garage",
		cost: 1_000_000,
		area: 1000 /* 12_000 sq. ft. = 1114.83 m2, rounded down */,
		rate: 1,
	},
	warehouse: {
		id: "warehouse",
		name: "Warehouse",
		// TODO
		icon: "garage",
		cost: 8_000_000,
		area: 7_500 /* 80_000 sq. ft. = 7_432.24 m2, rounded up */,
		rate: 1,
	},
	depot: {
		id: "depot",
		name: "Depot",
		// TODO
		icon: "garage",
		cost: 60_000_000,
		area: 50_000 /* 500_000 sq. ft. = 46_452 m2, rounded up */,
		rate: 1,
	},
} satisfies Record<string, Unit>;

export const UNIT_IDS = keys(UNITS);

export function getUnit(id: UnitID): Unit {
	return UNITS[id];
}
