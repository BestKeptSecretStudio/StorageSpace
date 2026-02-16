import { Accounts } from "@/columns/Accounts";
import { Savings } from "@/columns/Savings";
import { Transactions } from "@/columns/Transactions";
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
