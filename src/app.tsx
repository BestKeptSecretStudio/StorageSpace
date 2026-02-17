import { Accounts } from "@/components/layout/columns/Accounts";
import { Savings } from "@/components/layout/columns/Savings";
import { Transactions } from "@/components/layout/columns/Transactions";
import { Layout } from "@/Layout";

export function App() {
	return (
		<Layout>
			<Accounts />
			<Savings />
			<Transactions />
		</Layout>
	);
}
