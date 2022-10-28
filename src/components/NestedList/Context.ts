import { createContext } from "react";

const NestedContext = createContext<{
	items: LinkedListData;
	selected: Array<string>;
	onSelect: (key: string) => void;
}>({ items: [], selected: [], onSelect: () => {} });

export default NestedContext;
