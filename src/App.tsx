import { Card, CardContent } from "@mui/material";
import { Container } from "@mui/system";
import { FC, useState } from "react";
import { ListData } from "./components/NestedList/Context";
import { NestedProvider } from "./components/NestedList/NestedProvider";

const list: ListData = [
	{ id: "001", label: "Текст 1" },
	{ id: "002", label: "Текст 1-1", parent: "001" },
	{ id: "003", label: "Текст 1-2", parent: "001" },
	{ id: "004", label: "Текст 1-3", parent: "001" },
	{ id: "005", label: "Текст 2" },
	{ id: "006", label: "Текст 3" },
	{ id: "007", label: "Текст 1-3-1", parent: "004" },
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
