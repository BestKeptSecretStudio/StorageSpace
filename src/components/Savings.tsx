import { cn } from "@/lib/utils";
import type {
	ButtonHTMLAttributes,
	FunctionalComponent,
	HTMLAttributes,
} from "preact";

export type Style = keyof typeof UPGRADE_STYLES;

export const UPGRADE_STYLES = {
	area: {
		bg: "bg-blue-300",
		border: "border-blue-200",
		text: "text-[#0a004a] disabled:text-[#0a004a]/50",
		progress: "text-blue-400",
	},
} as const;

export const Savings: FunctionalComponent<
	ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => {
	return (
		<button
			class={cn(
				"relative",
				"w-full rounded-md p-4 pt-3.5 pb-2",
				"flex flex-col gap-y-4",
				"border shadow-sm hover:shadow-lg hover:active:shadow-none",
				// * this is the only real way to animate perspective
				// TODO: add `active` effect
				"transform-[perspective(1000px)_rotateX(0deg)] hover:transform-[perspective(800px)_rotateX(2deg)]",
				"overflow-hidden cursor-pointer transition",
				// * unsetting Tailwind defaults
				// TODO: migrate these types of styles to a reasonable reset stylesheet
				"text-left",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export const SavingsIcon: FunctionalComponent<
	HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
	return (
		<div
			class={cn(
				"absolute -top-4 -right-6",
				"size-16 -rotate-30 text-inherit/50",
				"z-10",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export const SavingsHeader: FunctionalComponent<
	HTMLAttributes<HTMLElement>
> = ({ children, className, ...props }) => {
	return (
		<header
			class={cn("w-full flex flex-col gap-y-2", className)}
			{...props}
		>
			{children}
		</header>
	);
};

export const SavingsTitle: FunctionalComponent<
	HTMLAttributes<HTMLHeadingElement>
> = ({ children, className, ...props }) => {
	return (
		<h3
			class={cn("text-xl font-medium text-inherit", className)}
			{...props}
		>
			{children}
		</h3>
	);
};

export const SavingsDescription: FunctionalComponent<
	HTMLAttributes<HTMLParagraphElement>
> = ({ children, className, ...props }) => {
	return (
		// * right-side padding serves as a gap against the floating icon
		<p
			class={cn("text-sm text-inherit tracking-wide pr-4", className)}
			{...props}
		>
			{children}
		</p>
	);
};

export const SavingsProgress: FunctionalComponent<
	HTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => {
	return <div {...props}>{children}</div>;
};
