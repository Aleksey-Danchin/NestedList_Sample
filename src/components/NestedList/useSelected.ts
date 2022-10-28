import { useContext, useMemo } from "react";
import NestedContext from "./Context";

export const useSelected = (key: string) => {
	const { items, selected } = useContext(NestedContext);

	return useMemo(
		() => isSelected(items, selected, key),
		[items, key, selected]
	);
};

export const isSelected = (
	items: LinkedListData,
	selected: Array<string>,
	key: string
) => {
	const item = items.find((item) => item.key === key) as LinkedListItem;

	if (item.leafs.length) {
		return items
			.filter(({ key }) => item.leafs.includes(key))
			.every(({ key }) => selected.includes(key));
	}

	return selected.includes(key);
};

export const isLeaf = (items: ListData, key: string) => {
	const item = items.find((item) => item.key === key);

	if (!item) {
		throw Error("item not found");
	}

	for (const { parent } of items) {
		if (parent === item.key) {
			return false;
		}
	}

	return true;
};

export const getSubitems = (items: ListData, key: string) => {
	if (isLeaf(items, key)) {
		return [];
	}

	const subitems = items.filter((item) => item.parent === key);
	const result: ListData = [];

	for (const subitem of subitems) {
		if (isLeaf(items, subitem.key)) {
			result.push(subitem);
		} else {
			result.push(...getSubitems(items, subitem.key));
		}
	}

	return result;
};
