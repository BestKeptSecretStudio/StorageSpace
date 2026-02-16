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
	reinforced_beams: {
		text: "Local engineers claim thinner AND stronger walls are possible. Shed owners rejoice.",
	},
	led_lighting: {
		text: "Study finds renters will pay a premium for sheds they can actually see inside.",
	},
	overhead_racks: {
		text: "Garages across America discover ceilings exist. Vertical storage booms.",
	},
	security_camera: {
		text: "Garage owners install cameras. Renters feel safer. Rates climb.",
	},
	mezzanine_level: {
		text: "Strip malls add second floors. Shoppers confused, renters thrilled.",
	},
	gated_entry: {
		text: "Storage facilities add gates. Monthly fees somehow increase. No one questions it.",
	},
} as const satisfies Record<string, NewsItem>;

export function getNewsItem(id: NewsID): NewsItem {
	return NEWS[id];
}
