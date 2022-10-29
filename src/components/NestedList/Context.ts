import { createContext } from "react";

export const _leafs = Symbol("_leafs");

export type NestedMap = {
	[_leafs]: Array<string>;
	[id: string]: Array<string>;
};

export type ListItemData = {
	id: string;
	label: string;
	parent?: string;
};

export type ListData = Array<ListItemData>;

export const NestedContext = createContext<{
	items: ListData;
	map: NestedMap;
	selected: Array<string>;
	onSelect: (id: string) => void;
}>({
	items: [],
	map: { [_leafs]: [] },
	selected: [],
	onSelect: () => {},
});
