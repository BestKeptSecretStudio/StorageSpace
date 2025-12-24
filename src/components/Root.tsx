import { cn } from "@/lib/utils";
import { type FunctionalComponent, type HTMLAttributes } from "preact";

export const Root: FunctionalComponent<HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...props
}) => {
	return (
		<div
			class={cn(
				"flex flex-col min-h-screen h-full font-grounded",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
