/// <reference types="react-scripts" />

type ListItemData = {
	label: string;
	key: string;
	parent?: string;
};

type ListData = Array<ListItemData>;

type LinkedListItem = ListItemData & { leafs: Array<string> };
type LinkedListData = Array<LinkedListItem>;
