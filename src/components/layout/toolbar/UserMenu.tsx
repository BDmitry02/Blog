import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppDispatch } from "@/tools/redux/store";
import { logoutUser } from "@/tools/redux/slices/user-slice";
import { StateUser } from "@/tools/types/user";
import { userConstants } from "@/tools/constants/user/user-constants";
import { muiSx } from "@/tools/constants/ui/mui-styles";

interface UserMenuProps {
    user: StateUser;
}

export function UserMenu({ user }: UserMenuProps) {
    const dispatch = useDispatch<AppDispatch>();

    const anchorEl = useRef<null | HTMLElement>(null);
    const [open, setIsOpen] = useState(false);

    const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        anchorEl.current = event.currentTarget;
        setIsOpen(true);
    };

    const onMenuClose = () => {
        setIsOpen(false);
        anchorEl.current = null;
    };

    return (
        <>
            <Tooltip title="Account Settings">
                <Button
                    className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm transition hover:bg-gray-100"
                    onClick={onMenuOpen}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-bold text-white uppercase">
                        {user.displayName ? user.displayName[0] : userConstants.unknownShoredName}
                    </span>
                    <span className="font-medium text-gray-800">
                        {user.displayName || userConstants.unknownUser}
                    </span>
                </Button>
            </Tooltip>
            <Menu
                anchorEl={anchorEl.current}
                open={open}
                onClose={onMenuClose}
                onClick={onMenuClose}
                slotProps={muiSx.menuUserMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={() => dispatch(logoutUser())} sx={muiSx.userMenuMenuItem}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <span className="font-medium text-red-600">Logout</span>
                </MenuItem>
            </Menu>
        </>
    );
}
