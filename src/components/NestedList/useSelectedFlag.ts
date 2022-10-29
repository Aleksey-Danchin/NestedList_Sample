import { useContext, useMemo } from "react";
import { NestedContext, NestedMap, _leafs } from "./Context";

export const NOT_SELECTED = 0;
export const PARTIALLY_SELECTED = 1;
export const SELECTED = 2;

export const useSelectedFlag = (id: string) => {
	const { map, selected } = useContext(NestedContext);

	return useMemo(
		() => getSelectedFlag({ map, selected, id }),
		[id, map, selected]
	);
};

export const getSelectedFlag = ({
	map,
	selected,
	id,
}: {
	map: NestedMap;
	selected: string[];
	id: string;
}) => {
	if (map[_leafs].includes(id)) {
		return selected.includes(id) ? SELECTED : NOT_SELECTED;
	}

	const leafIds = map[id];

	if (leafIds && leafIds.length) {
		if (leafIds.every((x) => selected.includes(x))) {
			return SELECTED;
		}

		if (leafIds.some((x) => selected.includes(x))) {
			return PARTIALLY_SELECTED;
		}
	}

	return NOT_SELECTED;
};
