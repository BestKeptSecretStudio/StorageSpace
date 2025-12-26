import { cn } from "@/lib/utils";
import type { CSSProperties, FunctionComponent, HTMLAttributes } from "react";
import "./FitText.css";

export const FitText: FunctionComponent<
	HTMLAttributes<HTMLSpanElement> & { max?: string }
> = ({ children, max, className, style, ...props }) => {
	return (
		<span
			className={cn("fit-text flex @container", className)}
			style={
				{
					"--fit-text-max": max,
					...(style as CSSProperties),
				} as CSSProperties
			}
			{...props}
		>
			<span className="fit-text-container grow @container">
				<span className="fit-text-display block">{children}</span>
			</span>
			<span aria-hidden="true" className="invisible">
				{children}
			</span>
		</span>
	);
};
