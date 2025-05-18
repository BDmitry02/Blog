import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { VoidFunc } from "@/tools/types/funcs";
import { muiSx } from "@/tools/constants/ui/mui-styles";

interface CloseModalProps {
    onClick: VoidFunc;
}

export function CloseModalButton({ onClick }: CloseModalProps) {
    return (
        <IconButton
            aria-label="close"
            onClick={onClick}
            size="small"
            className="z-10"
            sx={muiSx.closeModalButtonIcon}
        >
            <CloseIcon />
        </IconButton>
    );
}
