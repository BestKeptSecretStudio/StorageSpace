import { DEFAULT_ICON_KEY, ICONS, type IconKey } from "@/data/icons";
import type { FunctionalComponent, SVGAttributes } from "preact";

type SVGComponent = SVGAttributes<SVGSVGElement>;

type Icon = FunctionalComponent<SVGComponent & { name: IconKey }>;

const MissignIcon = ICONS[DEFAULT_ICON_KEY];

const Icon: Icon = ({ name, ...props }) => {
	if (!name) throw new Error("<Icon />: `name` prop not provided");

	const IconComponent = ICONS[name];

	if (!IconComponent) {
		console.warn(`<Icon />: Icon \`${name}\` not found.`);

		return <MissignIcon fill="currentColor" />;
	}

	return <IconComponent fill="currentColor" {...props} />;
};

export default Icon;
