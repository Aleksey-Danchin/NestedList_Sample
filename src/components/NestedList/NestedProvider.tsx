import { List, ListSubheader } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import NestedContext from "./Context";
import { NestedListItem } from "./NestedListItem";
import { getSubitems, isLeaf, isSelected } from "./useSelected";

type NestedProviderProps = {
	title?: string;
	items: ListData;
	selected: Array<string>;
	onSelect: (nextSelected: Array<string>) => void;
};

export const NestedProvider: FC<NestedProviderProps> = ({
	title,
	items,
	selected,
	onSelect,
}) => {
	const linkedItems = useMemo(() => {
		return items.map((item) => {
			const subitems = getSubitems(items, item.key);

			return {
				...item,
				leafs: subitems.map(({ key }) => key),
			};
		});
	}, [items]);

	const levelItems = useMemo(
		() => items.filter((item) => !item.parent),
		[items]
	);

	const selectHandler = useCallback(
		(key: string) => {
			const nextSelected = selected.slice();

			if (isLeaf(items, key)) {
				const index = nextSelected.indexOf(key);

				if (index !== -1) {
					nextSelected.splice(index, 1);
				} else {
					nextSelected.push(key);
				}
			} else {
				const subitems = getSubitems(items, key);
				const flag = isSelected(linkedItems, selected, key);

				if (flag) {
					for (const subitem of subitems) {
						const index = nextSelected.indexOf(subitem.key);
						if (index !== -1) {
							nextSelected.splice(index, 1);
						}
					}
				} else {
					nextSelected.push(...subitems.map(({ key }) => key));
				}
			}

			onSelect(nextSelected);
		},
		[items, linkedItems, onSelect, selected]
	);

	return (
		<NestedContext.Provider
			value={{ items: linkedItems, selected, onSelect: selectHandler }}
		>
			<List
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					title ? (
						<ListSubheader
							component="div"
							id="nested-list-subheader"
						>
							{title}
						</ListSubheader>
					) : null
				}
			>
				{levelItems.map((item) => (
					<NestedListItem key={item.key} item={item} />
				))}
			</List>
		</NestedContext.Provider>
	);
};
