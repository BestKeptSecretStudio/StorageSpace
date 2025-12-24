import { cn } from "@/lib/utils";
import type { FunctionalComponent } from "preact";

// SOURCE: https://www.untitledui.com/react/components/progress-indicators

export interface ProgressBarProps {
	/**
	 * The current value of the progress bar.
	 */
	value: number;
	/**
	 * The minimum value of the progress bar.
	 * @default 0
	 */
	min?: number;
	/**
	 * The maximum value of the progress bar.
	 * @default 100
	 */
	max?: number;
	/**
	 * Optional additional CSS class names for the progress bar container.
	 */
	className?: string;
	/**
	 * Optional additional CSS class names for the progress bar indicator element.
	 */
	progressClassName?: string;
}

/**
 * A basic progress bar component.
 */
export const Progress: FunctionalComponent<ProgressBarProps> = ({
	value,
	min = 0,
	max = 100,
	className,
	progressClassName,
}) => {
	const percentage = ((value - min) * 100) / (max - min);

	return (
		<div
			role="progressbar"
			aria-valuenow={value}
			aria-valuemin={min}
			aria-valuemax={max}
			className={cn(
				"h-2 w-full overflow-hidden rounded-md bg-[Canvas]",
				className,
			)}
		>
			<div
				// Use transform instead of width to avoid layout thrashing (and for smoother animation)
				style={{ transform: `translateX(-${100 - percentage}%)` }}
				className={cn(
					"size-full rounded-md bg-current transition duration-75 ease-linear",
					progressClassName,
				)}
			/>
		</div>
	);
};
