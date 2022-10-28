import { Card, CardContent } from "@mui/material";
import { Container } from "@mui/system";
import { FC, useState } from "react";
import { NestedProvider } from "./components/NestedList/NestedProvider";

const list: ListData = [
	{ label: "Текст 1", key: "001" },
	{ label: "Текст 1-1", key: "002", parent: "001" },
	{ label: "Текст 1-2", key: "003", parent: "001" },
	{ label: "Текст 1-3", key: "004", parent: "001" },
	{ label: "Текст 2", key: "005" },
	{ label: "Текст 3", key: "006" },
	{ label: "Текст 1-3-1", key: "007", parent: "004" },
];

export const App: FC = () => {
	const [selected, setSelected] = useState<string[]>(["005"]);

	return (
		<Container>
			<Card>
				<CardContent>
					<NestedProvider
						title="Заголовок списка"
						items={list}
						selected={selected}
						onSelect={setSelected}
					/>
				</CardContent>
			</Card>
		</Container>
	);
};
