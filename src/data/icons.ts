import GarageIcon from "@public/icons/garage.svg";
import ShedIcon from "@public/icons/shed.svg";

export type IconKey = keyof typeof ICONS;

export const DEFAULT_ICON_KEY = "missing" satisfies IconKey;

export const ICONS = {
	shed: ShedIcon,
	garage: GarageIcon,

	// * MISSING ICON
	missing: ShedIcon,
} as const;
