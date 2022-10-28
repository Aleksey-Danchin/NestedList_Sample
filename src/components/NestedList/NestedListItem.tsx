import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	ListItemButton,
	ListItemText,
	Collapse,
	Checkbox,
	ListItemIcon,
} from "@mui/material";
import { FC, useContext, useMemo, useState } from "react";
import NestedContext from "./Context";
import { NestedList } from "./NestedList";
import { useSelected } from "./useSelected";

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
		() => items.filter((x) => x.parent === item.key),
		[item.key, items]
	);

	const checked = useSelected(item.key);
	const sx = level ? { pl: level * 2 } : {};

	if (subitems.length) {
		return (
			<>
				<ListItemButton sx={sx} onClick={handleClick}>
					<ListItemIcon>
						<Checkbox
							edge="start"
							checked={checked}
							tabIndex={-1}
							disableRipple
							inputProps={{ "aria-labelledby": "flag3" }}
							onClick={(e) => {
								e.stopPropagation();
								onSelect(item.key);
							}}
						/>
					</ListItemIcon>
					<ListItemText primary={item.label} id="flag3" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<NestedList parent={item.key} level={level + 1} />
				</Collapse>
			</>
		);
	}

	return (
		<ListItemButton sx={sx} onClick={() => onSelect(item.key)}>
			<ListItemIcon>
				<Checkbox
					edge="start"
					checked={checked}
					tabIndex={-1}
					disableRipple
					inputProps={{ "aria-labelledby": item.key }}
				/>
			</ListItemIcon>
			<ListItemText primary={item.label} id={item.key} />
		</ListItemButton>
	);
};
