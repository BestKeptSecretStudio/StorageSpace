import { UNITS } from "@/data/storage";
import { getValue } from "@/data/values";
import { $units } from "@/state/$storage";
import { type USD } from "@/types/aliases";
import { atom, computed } from "nanostores";

export const MONEY_FORMATTER = Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const INITIAL_MONEY = UNITS["shed"].cost;

export const $money = atom(INITIAL_MONEY);
export const $totalMoney = atom(INITIAL_MONEY);

$money.subscribe((value, old) => {
	if (old === undefined) return;

	const difference = value - old;
	const total = $totalMoney.get() + difference;

	// * don't add if difference doesn't indicate an increase
	if (difference > 0) $totalMoney.set(total);
});

export const $income = computed($units, () => getValue(["income"]));

export function addMoney(value: USD): void {
	if (value < 0) throw new Error("Attempted to add negative amount of money");
	// ↓ this can happen when calendar advances with no units yet purchased
	// if (value === 0) throw new Error("Attempted to add zero money");

	return $money.set($money.get() + value);
}

export function removeMoney(value: USD): void {
	if (value < 0)
		throw new Error("Attempted to remove negative amount of money");
	if (value === 0) throw new Error("Attempted to remove zero money");

	const current = $money.get();

	if (current - value < 0)
		throw new Error("Attempted to remove more money than is available");

	return $money.set(current - value);
}

export function setMoney(value: USD): void {
	if (value < 0) throw new Error("Attempted to set money to negative amount");
	if (value === 0) throw new Error("Attempted to set money to zero");

	return $money.set(value);
}

export function hasEnoughMoney(required: USD): boolean {
	const current = $money.get();

	return current >= required;
}
