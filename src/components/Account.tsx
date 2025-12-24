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
				"p-4 pb-2 bg-slate-300 rounded-md border-slate-200 shadow hover:shadow-md hover:active:shadow-none hover:active:inset-shadow-sm",
				"text-sm text-slate-600 hover:text-slate-900 hover:active:text-black",
				"disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:shadow-md disabled:hover:active:text-slate-400",
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
		<div class={cn("size-8", className)} {...props}>
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
