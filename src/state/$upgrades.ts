import type { UnitID } from "@/data/storage";
import { type Upgrade, type UpgradeID, UPGRADES } from "@/data/upgrades";
import { values } from "@/lib/object";
import { MUTATOR_ORDER } from "@/lib/value";
import { atom, computed } from "nanostores";
import { addNews } from "./$news";
import { executeTransaction } from "./$transactions";

export const $upgrades = atom<UpgradeID[]>([]);

export const $effects = computed($upgrades, (upgrades) =>
	values(UPGRADES)
		.filter((upgrade) => upgrades.includes(upgrade.id))
		.map((data) => data.effects)
		.flat()
		.sort(
			(left, right) =>
				MUTATOR_ORDER.indexOf(left.mutator) -
				MUTATOR_ORDER.indexOf(right.mutator),
		),
);

// * `id` is by definition one of the valid keys
export function getUpgrade(id: UpgradeID): Upgrade {
	return UPGRADES[id];
}

export function resolveUpgradeTarget(id: UpgradeID): UnitID {
	const upgrade = getUpgrade(id);

	return upgrade.target;
}

export function addUpgrade(id: UpgradeID): void {
	if ($upgrades.get().includes(id))
		throw new Error(
			`Attempted to add upgrade ${id} to the list of purchased upgrades more than once`,
		);

	$upgrades.set([...$upgrades.get(), id]);
}

export function buyUpgrade(id: UpgradeID): void {
	const upgrade = getUpgrade(id);
	const { cost, news } = upgrade;

	executeTransaction({ type: "upgrade", target: id, cost, count: 1 });
	if (news) addNews(news);
}
