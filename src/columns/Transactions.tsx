import { Column, ColumnContent, ColumnHeading } from "@/components/Column";
import Icon from "@/components/Icon";
import {
	Transaction,
	TransactionCost,
	TransactionDescription,
	TransactionIcon,
	TransactionSource,
	TransactionTitle,
} from "@/components/Transaction";
import { getUnit, type UnitID } from "@/data/storage";
import type { UpgradeID } from "@/data/upgrades";
import { MONEY_FORMATTER } from "@/state/$money";
import { $transactions } from "@/state/$transactions";
import { getUpgrade, resolveUpgradeTarget } from "@/state/$upgrades";
import { useStore } from "@nanostores/preact";

export function Transactions() {
	const transactions = useStore($transactions);

	return (
		<Column>
			<ColumnHeading>Transactions</ColumnHeading>
			<ColumnContent class="min-h-60 flex flex-col gap-y-2 overflow-y-hidden">
				{transactions.map((transaction) => {
					const target =
						transaction.type === "upgrade"
							? resolveUpgradeTarget(
									transaction.target as UpgradeID,
								)
							: (transaction.target as UnitID);
					const item =
						transaction.type === "upgrade"
							? getUpgrade(transaction.target as UpgradeID)
							: getUnit(transaction.target as UnitID);

					return (
						<Transaction>
							<TransactionIcon>
								<Icon name={target} />
							</TransactionIcon>
							<TransactionDescription>
								<TransactionTitle>
									{transaction.count}x {item.name}
								</TransactionTitle>
								<TransactionSource>
									{transaction.type === "upgrade"
										? "Local company"
										: "Anonymous user"}
								</TransactionSource>
							</TransactionDescription>
							<TransactionCost>
								-
								{MONEY_FORMATTER.format(
									transaction.cost * transaction.count,
								)}
							</TransactionCost>
						</Transaction>
					);
				})}
			</ColumnContent>
		</Column>
	);
}
