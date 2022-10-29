import { FC, MouseEventHandler } from "react";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import {
	PARTIALLY_SELECTED,
	SELECTED,
	useSelectedFlag,
} from "./useSelectedFlag";

type CustomChecboxProps = {
	id: string;
	onClick?: MouseEventHandler;
};

export const CustomChecbox: FC<CustomChecboxProps> = ({
	id,
	onClick = () => {},
}) => {
	const selectedFlag = useSelectedFlag(id);

	if (selectedFlag === SELECTED) {
		return <CheckBoxIcon color="primary" onClick={onClick} />;
	}

	if (selectedFlag === PARTIALLY_SELECTED) {
		return <IndeterminateCheckBoxIcon onClick={onClick} />;
	}

	return <CheckBoxOutlineBlankIcon onClick={onClick} />;
};
