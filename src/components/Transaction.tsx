import { cn } from "@/lib/utils";
import type { FunctionalComponent, HTMLAttributes } from "preact";

export const Transaction: FunctionalComponent<
	HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
	return (
		<div class={cn("flex gap-x-2", className)} {...props}>
			{children}
		</div>
	);
};

export const TransactionIcon: FunctionalComponent<
	HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
	return (
		<div
			class={cn(
				"h-[2lh] aspect-square flex justify-center items-center bg-surface-sunken rounded-md p-2 text-ink-secondary",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export const TransactionDescription: FunctionalComponent<
	HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
	return (
		<div
			class={cn("w-full grow flex flex-col justify-center", className)}
			{...props}
		>
			{children}
		</div>
	);
};

export const TransactionTitle: FunctionalComponent<
	HTMLAttributes<HTMLSpanElement>
> = ({ children, ...props }) => {
	return <span {...props}>{children}</span>;
};

export const TransactionSource: FunctionalComponent<
	HTMLAttributes<HTMLSpanElement>
> = ({ children, className, ...props }) => {
	return (
		<span class={cn("text-sm text-ink-tertiary", className)} {...props}>
			{children}
		</span>
	);
};

export const TransactionCost: FunctionalComponent<
	HTMLAttributes<HTMLSpanElement>
> = ({ children, className, ...props }) => {
	return (
		<span
			class={cn("self-center text-negative font-medium", className)}
			{...props}
		>
			{children}
		</span>
	);
};
