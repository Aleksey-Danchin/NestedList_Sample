import { List, ListSubheader } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import {
	ListData,
	ListItemData,
	NestedContext,
	NestedMap,
	_leafs,
} from "./Context";
import { NestedListItem } from "./NestedListItem";
import { getSelectedFlag, NOT_SELECTED } from "./useSelectedFlag";

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
	const map = useMemo(() => {
		const map: NestedMap = { [_leafs]: [] };

		for (const item of items) {
			const leafs = getLeafs(item, items);

			if (leafs.length) {
				map[item.id] = leafs.map(({ id }) => id);
			} else {
				map[_leafs].push(item.id);
			}
		}

		return map;
	}, [items]);

	const levelItems = useMemo(
		() => items.filter((item) => !item.parent),
		[items]
	);

	const selectHandler = useCallback(
		(id: string) => {
			const nextSelected = selected.slice();

			if (map[_leafs].includes(id)) {
				const index = nextSelected.indexOf(id);

				if (index === -1) {
					nextSelected.push(id);
				} else {
					nextSelected.splice(index, 1);
				}
			} else {
				const leafIds = map[id];
				const selectedFlag = getSelectedFlag({ id, map, selected });

				if (selectedFlag === NOT_SELECTED) {
					nextSelected.push(...leafIds);
				} else {
					for (const leafId of leafIds) {
						const index = nextSelected.indexOf(leafId);

						if (index !== -1) {
							nextSelected.splice(index, 1);
						}
					}
				}
			}

			onSelect(nextSelected);
		},
		[map, onSelect, selected]
	);

	return (
		<NestedContext.Provider
			value={{ items, map, selected, onSelect: selectHandler }}
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
					<NestedListItem key={item.id} item={item} />
				))}
			</List>
		</NestedContext.Provider>
	);
};

const getLeafs = (item: ListItemData, items: ListData) => {
	const leafs = new Set<ListItemData>();

	const checkItem = (item: ListItemData) => {
		const subitems = items.filter(({ parent }) => parent === item.id);

		for (const subitem of subitems) {
			if (items.some(({ parent }) => parent === subitem.id)) {
				checkItem(subitem);
			} else {
				leafs.add(subitem);
			}
		}
	};

	checkItem(item);

	return Array.from(leafs) as ListData;
};
