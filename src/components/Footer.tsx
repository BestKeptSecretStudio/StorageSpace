import { cn } from "@/lib/utils";
import { type FunctionalComponent, type HTMLAttributes } from "preact";
import { Ticker } from "./Ticker";

// * we use `HTMLElement`, rather than the non-existent `HTMLHeaderElement`, because the HTML spec requires "elements that have no additional requirements" t use it
export const Footer: FunctionalComponent<HTMLAttributes<HTMLElement>> = ({
	children,
	className,
	...props
}) => {
	return (
		<footer class={cn("text-sm tracking-[0.02ch]", className)} {...props}>
			<Ticker />
			<div className="p-6">{children}</div>
		</footer>
	);
};
