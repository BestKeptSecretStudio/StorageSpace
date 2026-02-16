import type { Style } from "@/components/Savings";
import type { NewsID } from "@/data/news";
import { type UnitID } from "@/data/storage";
import { type Comparator, type Mutator } from "@/lib/value";
import type { USD } from "@/types/aliases";
import type { PropertyPath } from "./values";

// TODO: decide how to show upgrades
// * only show the next in "line"?
// * "line" is "improvements of the same stat on the same object"

// TODO: strongly type possible keys in property paths
// * there is a limited amount of possible keys for each position

export type PropertyValue = number;

export type Requirement = {
	key: PropertyPath;
	value: PropertyValue;
	comparator: Comparator;
};

export type Effect = {
	key: PropertyPath;
	value: PropertyValue;
	mutator: Mutator;
};

export type Upgrade = {
	id: string;
	name: string;
	description: string;
	target: UnitID;
	type: Style;
	cost: USD;
	requirements: Requirement[];
	effects: Effect[];
	/** Optionally emit an item of news with the purchase of this upgrade. */
	news?: NewsID;
};

export type UpgradeID = keyof typeof UPGRADES;

export const UPGRADES = {
	"shed/area/1": {
		id: "shed/area/1",
		name: "Thinner Walls",
		description: "Carve out the wood to add space. Genius!",
		target: "shed",
		type: "area",
		cost: 100,
		requirements: [
			{
				key: ["area"],
				comparator: ">=",
				value: 20,
			},
		],
		effects: [
			{
				key: ["area", "shed"],
				mutator: "*",
				value: 0.1,
			},
		],
		news: "thinner_walls",
	},
	"shed/rate/1": {
		id: "shed/rate/1",
		name: "Fresh Paint",
		description: "Amazing what a coat of paint does for perceived value.",
		target: "shed",
		type: "rate",
		cost: 200,
		requirements: [
			{
				key: ["money", "total"],
				comparator: ">=",
				value: 600,
			},
		],
		effects: [
			{
				key: ["rate", "shed"],
				mutator: "*",
				value: 0.1,
			},
		],
		news: "fresh_paint",
	},
} as const satisfies Record<string, Upgrade>;
