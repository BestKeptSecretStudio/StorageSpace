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
				"flex flex-col min-h-screen h-full font-grounded bg-surface text-ink",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
