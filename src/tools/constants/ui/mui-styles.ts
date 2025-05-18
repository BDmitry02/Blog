const uiColors = {
    primary: "#1976d2",
    error: "#d32f2f",
    white: "#fff",
    gray900: "#222",
    grayBg: "#fafbfc",
    hoverBg: "#f5f5f5",
    lightGray: "#888",
};

export const muiSx = {
    burgerMenuButtonIcon: { color: uiColors.gray900 },
    burgerMenuEditIcon: { color: uiColors.primary },
    burgerMenuDeleteIcon: { color: uiColors.error },
    closeModalButtonIcon: { color: uiColors.lightGray },
    burgerMenuDrawerPaper: {
        paper: {
            sx: {
                width: 320,
                background: uiColors.grayBg,
                boxShadow: 3,
                borderRadius: "0 12px 12px 0",
                padding: 2,
            },
        },
    },
    burgerMenuSelect: {
        background: uiColors.white,
        borderRadius: 2,
    },
    burgerMenuButtonWhite: {
        background: uiColors.white,
        boxShadow: 1,
        minWidth: 0,
        padding: 1,
        borderRadius: "50%",
        "&:hover": { background: uiColors.hoverBg },
    },
    toolbarSignInButton: { textTransform: "none", borderRadius: 999, boxShadow: 1 },
    toolbarSignUpButton: { textTransform: "none", borderRadius: 999, borderWidth: 2 },
    userMenuMenuItem: {
        borderRadius: 1,
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
    },
    menuUserMenu: {
        paper: {
            elevation: 0,
            sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                },
            },
        },
    },
    buttonNoTextTransform: { textTransform: "none" },
    errorIcon: { fontSize: 48 },
    errorButton: { mt: 2, fontWeight: 500, fontSize: 16, borderRadius: 2, textTransform: "none" },
};
