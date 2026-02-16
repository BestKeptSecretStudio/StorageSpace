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
	"shed/area/2": {
		id: "shed/area/2",
		name: "Reinforced Beams",
		description: "Thinner but stronger. Engineering!",
		target: "shed",
		type: "area",
		cost: 500,
		requirements: [
			{
				key: ["money", "total"],
				comparator: ">=",
				value: 2_000,
			},
		],
		effects: [
			{
				key: ["area", "shed"],
				mutator: "*",
				value: 0.15,
			},
		],
		news: "reinforced_beams",
	},
	"shed/rate/2": {
		id: "shed/rate/2",
		name: "LED Lighting",
		description:
			"Renters will pay a premium for sheds they can see inside.",
		target: "shed",
		type: "rate",
		cost: 800,
		requirements: [
			{
				key: ["area", "shed"],
				comparator: ">=",
				value: 50,
			},
		],
		effects: [
			{
				key: ["rate", "shed"],
				mutator: "*",
				value: 0.15,
			},
		],
		news: "led_lighting",
	},
	"garage/area/1": {
		id: "garage/area/1",
		name: "Overhead Racks",
		description: "Turns out garages have ceilings. Who knew?",
		target: "garage",
		type: "area",
		cost: 3_000,
		requirements: [
			{
				key: ["area"],
				comparator: ">=",
				value: 150,
			},
		],
		effects: [
			{
				key: ["area", "garage"],
				mutator: "*",
				value: 0.1,
			},
		],
		news: "overhead_racks",
	},
	"garage/rate/1": {
		id: "garage/rate/1",
		name: "Security Camera",
		description: "Renters feel safer. Rates climb. Everybody wins.",
		target: "garage",
		type: "rate",
		cost: 5_000,
		requirements: [
			{
				key: ["money", "total"],
				comparator: ">=",
				value: 50_000,
			},
		],
		effects: [
			{
				key: ["rate", "garage"],
				mutator: "*",
				value: 0.1,
			},
		],
		news: "security_camera",
	},
	"lot/area/1": {
		id: "lot/area/1",
		name: "Mezzanine Level",
		description: "Adding a second floor never hurt anyone. Probably.",
		target: "lot",
		type: "area",
		cost: 30_000,
		requirements: [
			{
				key: ["area", "lot"],
				comparator: ">=",
				value: 600,
			},
		],
		effects: [
			{
				key: ["area", "lot"],
				mutator: "*",
				value: 0.1,
			},
		],
		news: "mezzanine_level",
	},
	"lot/rate/1": {
		id: "lot/rate/1",
		name: "Gated Entry",
		description: "A gate and a keypad. Monthly fees somehow increase.",
		target: "lot",
		type: "rate",
		cost: 50_000,
		requirements: [
			{
				key: ["money", "total"],
				comparator: ">=",
				value: 500_000,
			},
		],
		effects: [
			{
				key: ["rate", "lot"],
				mutator: "*",
				value: 0.1,
			},
		],
		news: "gated_entry",
	},
} as const satisfies Record<string, Upgrade>;
