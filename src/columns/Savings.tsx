import { Column, ColumnContent, ColumnHeading } from "@/components/Column";
import Icon from "@/components/Icon";
import { Progress } from "@/components/Progress";
import {
	Saving,
	SavingDescription,
	SavingHeader,
	SavingIcon,
	SavingsProgress,
	SavingTitle,
	UPGRADE_STYLES,
} from "@/components/Savings";
import { UPGRADES } from "@/data/upgrades";
import { getRequirementLabel, getValue } from "@/data/values";
import { values } from "@/lib/object";
import { cn } from "@/lib/utils";
import { compare } from "@/lib/value";
import { $money, hasEnoughMoney } from "@/state/$money";
import { $units } from "@/state/$storage";
import { $upgrades, buyUpgrade } from "@/state/$upgrades";
import { useStore } from "@nanostores/preact";

export function Savings() {
	const upgrades = useStore($upgrades);
	const units = useStore($units);
	// * forces requirement checks to recalculate
	useStore($money);

	return (
		<Column>
			<ColumnHeading>Savings</ColumnHeading>
			<ColumnContent class="flex flex-col gap-y-2">
				{values(UPGRADES)
					.filter(
						(upgrade) =>
							!upgrades.includes(upgrade.id) &&
							units[upgrade.target].visible,
					)
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

						return (
							<Saving
								className={cn(
									styles.bg,
									styles.border,
									styles.text,
								)}
								onClick={() => buyUpgrade(upgrade.id)}
								disabled={!canBuy}
							>
								<SavingIcon>
									<Icon name={upgrade.target} />
								</SavingIcon>
								<SavingHeader>
									<SavingTitle>{upgrade.name}</SavingTitle>
									<SavingDescription>
										{upgrade.description}
									</SavingDescription>
								</SavingHeader>
								{requirements.map((requirement) => {
									const current = getValue(requirement.key);
									const isSatisfied = compare(
										current,
										requirement.comparator,
										requirement.value,
									);

									if (isSatisfied)
										return (
											<div class="flex items-center gap-x-2 h-[1.33lh]">
												<Icon name="checkmark" />{" "}
												Available for purchase
											</div>
										);

									const label = getRequirementLabel(
										requirement.key,
									);
									const metric = `${parseFloat(current.toFixed(2))} / ${requirement.value}`;

									return (
										<SavingsProgress class="w-full flex flex-col gap-y-1 z-20">
											<Progress
												value={current}
												max={requirement.value}
											/>
											<div class="flex justify-between text-sm">
												<span>{label}</span>
												<span>{metric}</span>
											</div>
										</SavingsProgress>
									);
								})}
							</Saving>
						);
					})}
			</ColumnContent>
		</Column>
	);
}
