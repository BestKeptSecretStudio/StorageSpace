import { cn } from "@/lib/utils";
import {
	type ButtonHTMLAttributes,
	type FunctionalComponent,
	type HTMLAttributes,
} from "preact";

export const Account: FunctionalComponent<
	ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => {
	return (
		<button
			class={cn(
				"aspect-square size-32 flex flex-col",
				"p-4 pb-2 bg-surface-raised rounded-md border border-border",
				"shadow-sm hover:shadow-md hover:active:shadow-none hover:active:inset-shadow-sm",
				"text-sm text-ink-secondary hover:text-ink hover:active:text-ink",
				"disabled:cursor-not-allowed disabled:text-ink-tertiary disabled:hover:shadow-sm disabled:hover:active:text-ink-tertiary",
				"cursor-pointer transition",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export const AccountIcon: FunctionalComponent<
	HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
	return (
		<div class={cn("size-10", className)} {...props}>
			{children}
		</div>
	);
};

export const AccountCost: FunctionalComponent<
	HTMLAttributes<HTMLSpanElement>
> = ({ children, className, ...props }) => {
	return (
		<span class={cn("", className)} {...props}>
			{children}
		</span>
	);
};

export const AccountName: FunctionalComponent<
	HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
	return (
		<div
			class={cn("mt-auto font-medium tracking-[0.035ch]", className)}
			{...props}
		>
			{children}
		</div>
	);
};
