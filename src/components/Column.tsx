import { cn } from "@/lib/utils";
import { type FunctionalComponent, type HTMLAttributes } from "preact";

// * we use `HTMLElement`, rather than the non-existent `HTMLHeaderElement`, because the HTML spec requires "elements that have no additional requirements" t use it
export const Column: FunctionalComponent<HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...props
}) => {
	return (
		<div
			class={cn(
				"flex flex-col flex-[1_1_24rem] gap-y-4 w-full",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export const ColumnHeading: FunctionalComponent<
	HTMLAttributes<HTMLHeadingElement>
> = ({ children, className, ...props }) => {
	return (
		<h2 class={cn("text-xl font-bold", className)} {...props}>
			{children}
		</h2>
	);
};

// * this component is likely the best way to handle flex-based spacing between column heading and its contents with `gap-*`
export const ColumnContent: FunctionalComponent<
	HTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => {
	return <div {...props}>{children}</div>;
};
