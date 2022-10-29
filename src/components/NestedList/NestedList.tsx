import { List } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { NestedContext } from "./Context";
import { NestedListItem } from "./NestedListItem";

type NestedListProps = {
	parent?: string;
	level?: number;
};

export const NestedList: FC<NestedListProps> = ({ parent, level = 0 }) => {
	const { items } = useContext(NestedContext);

	const levelItems = useMemo(
		() => items.filter((item) => item.parent === parent),
		[items, parent]
	);

	const sx = level ? { pl: level * 2 } : {};

	return (
		<List component="nav" aria-labelledby="nested-list-subheader" sx={sx}>
			{levelItems.map((item) => (
				<NestedListItem key={item.id} item={item} level={level} />
			))}
		</List>
	);
};
