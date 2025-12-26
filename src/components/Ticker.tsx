import { getNewsItem } from "@/data/news";
import { cn } from "@/lib/utils";
import { $news, shiftNews } from "@/state/$news";
import { useStore } from "@nanostores/preact";
import type { FunctionalComponent, HTMLAttributes } from "preact";
import { useEffect, useRef } from "preact/hooks";

const SCROLL_SPEED = 100; // * pixels per second
const GAP_DELAY = 1000; // * ms between lines

function updateNewsPipeline() {
	setTimeout(shiftNews, GAP_DELAY);
}

const Line: FunctionalComponent<{
	text: string;
}> = ({ text }) => {
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		let position = window.innerWidth;
		let last = performance.now();
		let rafID: ReturnType<typeof requestAnimationFrame>;

		const tick = (timestamp: number) => {
			if (!ref.current) return;

			const delta = timestamp - last;
			last = timestamp;

			position -= SCROLL_SPEED * (delta / 1000);
			ref.current.style.transform = `translateX(${position}px)`;

			if (position < -ref.current.offsetWidth) {
				updateNewsPipeline();
			} else {
				rafID = requestAnimationFrame(tick);
			}
		};

		rafID = requestAnimationFrame(tick);

		return () => cancelAnimationFrame(rafID);
	}, []);

	return (
		<span
			ref={ref}
			class="inline-block"
			style={{ transform: `translateX(${window.innerWidth}px)` }}
		>
			{text}
		</span>
	);
};

export const Ticker: FunctionalComponent<HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => {
	const [line] = useStore($news);
	const text = !!line ? getNewsItem(line).text : null;

	return (
		<div
			class={cn(
				"flex items-center sticky bottom-0 w-full h-8 py-1 overflow-x-hidden border-t",
				className,
			)}
			{...props}
		>
			{text !== null && <Line key={line} text={text} />}
		</div>
	);
};
