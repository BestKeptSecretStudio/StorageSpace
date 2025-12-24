import { cn } from "@/lib/utils";
import { type FunctionalComponent, type HTMLAttributes } from "preact";

// * we use `HTMLElement`, rather than the non-existent `HTMLHeaderElement`, because the HTML spec requires "elements that have no additional requirements" t use it
export const Header: FunctionalComponent<HTMLAttributes<HTMLElement>> = ({
	children,
	className,
	...props
}) => {
	// * `z-100` is necessary to keep header above everything, since upgrades create a new stacking context from `relative` for use with `absolute`
	return (
		<header
			class={cn(
				"sticky top-0 left-0 w-full p-6 z-100",
				"bg-linear-to-b from-[Canvas] via-[Canvas] via-80% to-transparent",
				className,
			)}
			{...props}
		>
			{children}
		</header>
	);
};
