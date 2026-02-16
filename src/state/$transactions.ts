import type { UnitID } from "@/data/storage";
import type { UpgradeID } from "@/data/upgrades";
import type { USD } from "@/types/aliases";
import { atom } from "nanostores";
import { removeMoney } from "./$money";
import { addUnit } from "./$storage";
import { addUpgrade } from "./$upgrades";

type TransactionID = {
	// * simple sequential number
	// * we don't need idempotency out of these objects: they are near-ephemeral
	id: number;
};

type TransactionBody = (
	| {
			type: "upgrade";
			target: UpgradeID;
	  }
	| {
			type: "unit";
			target: UnitID;
	  }
) & {
	// * we calculate and store the income/cost because between the transaction and now, the value of the product may have been recalculated
	// * recalculating a past value would make no sense
	cost: USD;
	count: number;
};
export type Transaction = TransactionID & TransactionBody;

const MAX_TRANSACTIONS = 10;

export const $transactions = atom<Transaction[]>([]);

export function addTransactionToHistory(transaction: TransactionBody): void {
	const current = $transactions.get();
	const id = Math.max(...current.map((transaction) => transaction.id), 0) + 1;

	$transactions.set([
		{ id, ...transaction },
		// * `slice()`'s `end` param is exclusive
		...$transactions.get().slice(0, MAX_TRANSACTIONS - 1),
	]);
}

export function executeTransaction(transaction: TransactionBody): void {
	removeMoney(transaction.cost * transaction.count);

	if (transaction.type === "upgrade") addUpgrade(transaction.target);
	else addUnit(transaction.target, transaction.count);

	addTransactionToHistory(transaction);
}
