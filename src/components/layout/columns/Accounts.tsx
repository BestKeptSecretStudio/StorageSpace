import {
	Account,
	AccountCost,
	AccountIcon,
	AccountName,
} from "@/components/Account";
import { Column, ColumnContent, ColumnHeading } from "@/components/Column";
import Icon from "@/components/Icon";
import { UNITS } from "@/data/storage";
import { keys } from "@/lib/object";
import { $money, hasEnoughMoney, MONEY_FORMATTER } from "@/state/$money";
import { $units, buyUnit, getUnitCost } from "@/state/$storage";
import { useStore } from "@nanostores/preact";

export function Accounts() {
	const units = useStore($units);
	// * forces costs/"has enough money" to recalculate
	useStore($money);

	return (
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
	);
}
