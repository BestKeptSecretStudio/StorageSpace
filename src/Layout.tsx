import { FitText } from "@/components/FitText";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Root } from "@/components/Root";
import { $week, tick } from "@/state/$week";
import { $income, $money, addMoney, MONEY_FORMATTER } from "@/state/$money";
import { $area, AREA_FORMATTER } from "@/state/$storage";
import { useStore } from "@nanostores/preact";

export const Layout: typeof Root = ({ children, ...props }) => {
	const money = useStore($money);
	const income = useStore($income);
	const area = useStore($area);
	const week = useStore($week);

	return (
		<Root {...props}>
			<Header>
				<FitText
					className="font-ultrabold tabular-nums [--fit-text-max:var(--text-fluid-10)] sm:[--fit-text-max:var(--text-fluid-7)]"
					onClick={() => addMoney(1000)}
				>
					{MONEY_FORMATTER.format(money)}
				</FitText>
				<p class="tabular-nums -ml-[1ch]">
					+{MONEY_FORMATTER.format(income)}
				</p>
				<p class="tabular-nums">{AREA_FORMATTER.format(area)} m²</p>
				<p class="tabular-nums select-none" onClick={tick}>
					Week {week}
				</p>
			</Header>
			<Main>{children}</Main>
			<Footer>
				<p>Best Kept Secret © {new Date().getFullYear()}</p>
				<p>
					Not an actual banking app. Don't send your money to people
					without verifying their identity first.
				</p>
			</Footer>
		</Root>
	);
};
