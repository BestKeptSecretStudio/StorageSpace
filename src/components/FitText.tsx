import { cn } from "@/lib/utils";
import type {
	CSSProperties,
	FunctionalComponent,
	HTMLAttributes,
} from "preact";
import "./FitText.css";

export const FitText: FunctionalComponent<
	HTMLAttributes<HTMLSpanElement> & { max?: string }
> = ({ children, max, className, style, ...props }) => {
	return (
		<span
			class={cn("fit-text", className)}
			style={{ "--fit-text-max": max, ...(style as CSSProperties) }}
			{...props}
		>
			<span class="fit-text__container">
				<span class="fit-text__display">{children}</span>
			</span>
			<span aria-hidden="true" class="fit-text__reference">
				{children}
			</span>
		</span>
	);
};
