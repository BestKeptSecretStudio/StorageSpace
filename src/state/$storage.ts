import { UNITS, type UnitID } from "@/data/storage";
import { getTotalValue } from "@/data/values";
import { entries } from "@/lib/object";
import { $money } from "@/state/$money";
import { deepMap } from "@nanostores/deepmap";
import { computed, onMount } from "nanostores";
import { executeTransaction } from "./$transactions";

type UnitMap = Record<UnitID, UnitData>;

type UnitData = {
	count: number;
	visible: boolean;
};

export const AREA_FORMATTER = Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const $units = deepMap<UnitMap>({
	shed: { count: 0, visible: true },
	garage: { count: 0, visible: false },
});
// TODO: `$placeholderVisible`: show placeholder of the next unit if the player is 80% towards its cost
// * do not hide the placeholder if player's money drops; only hide when next type is revealed
// * use the same pattern as in `$money.listen()` below

// * lazily calculate whether a unit should be visible
// * using `onMount()` avoids initialization dependency with `$units`
// * by the time it mounts, everything else would've been initialized
onMount($units, () => {
	const unlisten = $money.listen((money) => {
		const units = $units.get();
		const mapped = entries(units).map(([key, unit]) => {
			const data = UNITS[key];

			return [
				key,
				{
					...unit,
					// * if `true` already, settle on it
					// * this avoids recalculation based on *current* money
					// * and thus doesn't "disappear" already-eligible units
					visible: unit.visible || money >= data.cost,
				} satisfies UnitData,
			] satisfies [UnitID, UnitData];
		});
		// FIXME: despite our earlier assertions, this does not map back to `UnitMap` on its own
		// * this may be because `.fromEntries()`'s type returns `[k: string]` for key
		const map = Object.fromEntries(mapped) as UnitMap;

		$units.set(map);
	});

	return unlisten;
});

export const $area = computed($units, () => getTotalValue(["area"]));
// TODO: migrate formatting to the UI layer?
export const $displayArea = computed($area, (area) => {
	return `${AREA_FORMATTER.format(area)} m²`;
});

export function addUnit(id: UnitID, value: number): void {
	if (value < 0)
		throw new Error(
			`Attempted to add less than zero of storage type \`${id}\``,
		);

	const current = $units.get()[id].count;

	return $units.setKey(`${id}.count`, current + value);
}

export function setUnit(id: UnitID, value: number): void {
	if (value < 0)
		throw new Error(
			`Attempted to set storage type \`${id}\` to less than zero`,
		);

	return $units.setKey(`${id}.count`, value);
}

function getCostScaling(cost: number, count: number): number {
	let scaled = cost;

	while (count--) {
		scaled += (cost / 10) * count * 2;
	}

	return scaled;
}

export function getUnitCost(id: UnitID): number {
	const unit = UNITS[id];
	const count = $units.get()[id].count;

	return getCostScaling(unit.cost, count);
}

// * `count` would allow buying multiples, e.g. 10 or 100
// * whether we can buy `count`'s worth of `id` is guarded on the UI's end
// * we assume that if we attempt to buy, we can
export function buyUnit(id: UnitID, count = 1): void {
	// TODO: calculate with an appropriate offset
	// * consider how many units player wants to buy by accounting for the scaling value for each purchased unit in the batch
	// * use `getCostScaling()` directly? (current count [existing] + desired count [from this fn])
	const cost = getUnitCost(id);

	executeTransaction("unit", id, cost, count);
}
