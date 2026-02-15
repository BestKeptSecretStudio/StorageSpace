import type { Requirement } from "@/data/upgrades";

export type NewsID = keyof typeof NEWS;

export type NewsItem = {
	text: string;
	requirements?: Requirement[];
};

export const NEWS = {
	thinner_walls: {
		text: "This just in: thinner walls for storage containers are trending!" /* requirements: [{}] */,
	},
	fresh_paint: {
		text: "Breaking: customers willing to pay more for stuff stored in a nicer-looking shed.",
	},
} as const satisfies Record<string, NewsItem>;

export function getNewsItem(id: NewsID): NewsItem {
	return NEWS[id];
}
