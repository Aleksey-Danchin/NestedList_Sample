import { FC, useContext, useMemo, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { ListItemData, NestedContext } from "./Context";
import { NestedList } from "./NestedList";

import {
	ListItemButton,
	ListItemText,
	Collapse,
	ListItemIcon,
} from "@mui/material";

import { CustomChecbox } from "./CustomChecbox";

type NestedListItemProps = {
	item: ListItemData;
	level?: number;
};

export const NestedListItem: FC<NestedListItemProps> = ({
	item,
	level = 0,
}) => {
	const { items, onSelect } = useContext(NestedContext);
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const subitems = useMemo(
		() => items.filter((x) => x.parent === item.id),
		[item.id, items]
	);

	const sx = level ? { pl: level * 2 } : {};

	if (subitems.length) {
		return (
			<>
				<ListItemButton sx={sx} onClick={handleClick}>
					<ListItemIcon>
						<CustomChecbox
							id={item.id}
							onClick={(e) => {
								e.stopPropagation();
								onSelect(item.id);
							}}
						/>
					</ListItemIcon>
					<ListItemText primary={item.label} id="flag3" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<NestedList parent={item.id} level={level + 1} />
				</Collapse>
			</>
		);
	}

	return (
		<ListItemButton sx={sx} onClick={() => onSelect(item.id)}>
			<ListItemIcon>
				<CustomChecbox id={item.id} />
			</ListItemIcon>
			<ListItemText primary={item.label} id={item.id} />
		</ListItemButton>
	);
};
