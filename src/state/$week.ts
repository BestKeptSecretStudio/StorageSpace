import { atom, onMount } from "nanostores";
import { $income, addMoney } from "./$money";

export const $week = atom(1);

export function advanceDate(): void {
	$week.set($week.get() + 1);
}

// TODO: move to a separate game-loop file
export function tick(): void {
	advanceDate();
	addMoney($income.get());
}

onMount($week, () => {
	const destroy = setInterval(tick, 1000);

	return () => destroy;
});
