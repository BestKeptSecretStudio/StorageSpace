import type { UnitID } from "@/data/storage";
import type { UpgradeID } from "@/data/upgrades";
import type { USD } from "@/types/aliases";
import { atom } from "nanostores";
import { removeMoney } from "./$money";
import { addUnit } from "./$storage";
import { addUpgrade } from "./$upgrades";

export type TransactionType = "upgrade" | "unit";

export type Transaction = {
	// * simple sequential number
	// * we don't need idempotency out of these objects: they are near-ephemeral
	id: number;
	type: TransactionType;
	target: UnitID | UpgradeID;
	// * we calculate and store the income/cost because between the transaction and now, the value of the product may have been recalculated
	// * recalculating a past value would make no sense
	cost: USD;
	count: number;
};

const MAX_TRANSACTIONS = 10;

export const $transactions = atom<Transaction[]>([]);

export function addTransactionToHistory(
	transaction: Omit<Transaction, "id">,
): void {
	const current = $transactions.get();
	const id = Math.max(...current.map((transaction) => transaction.id), 0) + 1;

	return $transactions.set([
		{ id, ...transaction },
		// * `slice()`'s `end` param is exclusive
		...$transactions.get().slice(0, MAX_TRANSACTIONS - 1),
	]);
}

export function executeTransaction(
	type: "upgrade",
	id: UpgradeID,
	cost: USD,
	count: number,
): void;
export function executeTransaction(
	type: "unit",
	id: UnitID,
	cost: USD,
	count: number,
): void;
export function executeTransaction(
	type: TransactionType,
	id: UpgradeID | UnitID,
	cost: USD,
	count = 1,
): void {
	removeMoney(cost * count);
	type === "upgrade"
		? addUpgrade(id as UpgradeID)
		: addUnit(id as UnitID, count);
	addTransactionToHistory({ type, target: id, cost, count });
}
