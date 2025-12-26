import {
	Account,
	AccountCost,
	AccountIcon,
	AccountName,
} from "@/components/Account";
import { Column, ColumnContent, ColumnHeading } from "@/components/Column";
import Icon from "@/components/Icon";
import { Progress } from "@/components/Progress";
import {
	Savings,
	SavingsDescription,
	SavingsHeader,
	SavingsIcon,
	SavingsProgress,
	SavingsTitle,
	UPGRADE_STYLES,
} from "@/components/Savings";
import { getUnit, UNITS, type UnitID } from "@/data/storage";
import { Layout } from "@/Layout";
import { keys, values } from "@/lib/object";
import { $area, $units, buyUnit, getUnitCost } from "@/state/$storage";
import { useStore } from "@nanostores/preact";
import {
	Transaction,
	TransactionCost,
	TransactionDescription,
	TransactionIcon,
	TransactionSource,
	TransactionTitle,
} from "./components/Transaction";
import { UPGRADES, type UpgradeID } from "./data/upgrades";
import { getValue } from "./data/values";
import { cn } from "./lib/utils";
import { compare } from "./lib/value";
import { $money, hasEnoughMoney, MONEY_FORMATTER } from "./state/$money";
import { $transactions } from "./state/$transactions";
import {
	$upgrades,
	buyUpgrade,
	getUpgrade,
	resolveUpgradeTarget,
} from "./state/$upgrades";

export function App() {
	const units = useStore($units);
	const upgrades = useStore($upgrades);
	const transactions = useStore($transactions);
	// * calling this forces costs/"has enough money" to recalculate
	useStore($money);
	useStore($area);

	return (
		<Layout>
			<Column>
				<ColumnHeading>Accounts</ColumnHeading>
				<ColumnContent class="flex flex-wrap gap-2">
					{keys(units)
						.filter((id) => units[id].visible)
						.map((id) => {
							const unit = UNITS[id];
							const cost = getUnitCost(id);
							const canBuy = hasEnoughMoney(cost);

							return (
								<Account
									key={id}
									onClick={() => buyUnit(id, 1)}
									disabled={!canBuy}
								>
									<AccountIcon>
										<Icon name={unit.icon} />
									</AccountIcon>
									<AccountCost>
										{MONEY_FORMATTER.format(cost)}
									</AccountCost>
									<AccountName>{unit.name}</AccountName>
								</Account>
							);
						})}
				</ColumnContent>
			</Column>
			<Column>
				<ColumnHeading>Savings</ColumnHeading>
				<ColumnContent>
					{values(UPGRADES)
						.filter((upgrade) => !upgrades.includes(upgrade.id))
						.map((upgrade) => {
							const styles = UPGRADE_STYLES[upgrade.type];
							const requirements = upgrade.requirements;
							const canBuy =
								requirements.every((requirement) =>
									compare(
										getValue(requirement.key),
										requirement.comparator,
										requirement.value as number,
									),
								) && hasEnoughMoney(upgrade.cost);

							// TODO: add styling for "success"/satisfied state

							return (
								<Savings
									className={cn(
										styles.bg,
										styles.border,
										styles.text,
									)}
									onClick={() => buyUpgrade(upgrade.id)}
									disabled={!canBuy}
								>
									<SavingsIcon>
										<Icon name={upgrade.target} />
									</SavingsIcon>
									<SavingsHeader>
										<SavingsTitle>
											{upgrade.name}
										</SavingsTitle>
										<SavingsDescription>
											{upgrade.description}
										</SavingsDescription>
									</SavingsHeader>
									{requirements.map((requirement) => {
										const current = getValue(
											requirement.key,
										);
										const isSatisfied = compare(
											current,
											requirement.comparator,
											requirement.value as number,
										);

										// TODO: if satisfied, don't render progress bar
										// * fill same space with padding to avoid offsetting the size?

										return (
											<SavingsProgress class="w-full flex flex-col gap-y-1 z-20">
												<Progress
													value={current}
													max={requirement.value}
												/>
												<div class="flex justify-between text-sm">
													{/* TODO: replace display value with e.g. "Total
													sheds" */}
													<span>{current}</span>
													<span>
														{requirement.value}
													</span>
												</div>
											</SavingsProgress>
										);
									})}
								</Savings>
							);
						})}
				</ColumnContent>
			</Column>
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
		</Layout>
	);
}
