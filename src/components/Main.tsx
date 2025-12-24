import { cn } from "@/lib/utils";
import { type FunctionalComponent, type HTMLAttributes } from "preact";

// * we use `HTMLElement`, rather than the non-existent `HTMLHeaderElement`, because the HTML spec requires "elements that have no additional requirements" t use it
export const Main: FunctionalComponent<HTMLAttributes<HTMLElement>> = ({
	children,
	className,
	...props
}) => {
	return (
		<main
			class={cn("w-full grow flex flex-wrap gap-6 p-6", className)}
			{...props}
		>
			{children}
		</main>
	);
};
