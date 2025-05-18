import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
    Button,
    FormControl,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tooltip,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { CloseModalButton } from "@/components/modal-window/CloseModalButton";
import { postCategories, postTags } from "@/tools/constants/posts/post-constants";
import { AppDispatch } from "@/tools/redux/store";
import { getFilteredPosts, getAllPosts } from "@/tools/redux/slices/post-slice";
import { useModal } from "@/tools/hooks/useModal";
import { uiTexts } from "@/tools/constants/ui/texts";
import { muiSx } from "@/tools/constants/ui/mui-styles";

export function BurgerMenu() {
    const dispatch = useDispatch<AppDispatch>();
    const { isOpened, openModal, closeModal } = useModal(false);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const onTagChange = useCallback((event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedTags(value);
    }, []);

    const onCategoryChange = useCallback((event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedCategory(value);
    }, []);

    const onApplyClick = useCallback(() => {
        dispatch(getFilteredPosts({ selectedTags, selectedCategory }));
        closeModal();
    }, [dispatch, selectedCategory, selectedTags, closeModal]);

    const onResetClick = useCallback(() => {
        dispatch(getAllPosts());
        setSelectedTags([]);
        setSelectedCategory([]);
        closeModal();
    }, [dispatch, closeModal]);

    return (
        <>
            <Tooltip title={uiTexts.filters}>
                <Button onClick={openModal} sx={muiSx.burgerMenuButtonWhite}>
                    <MenuOutlinedIcon sx={muiSx.burgerMenuButtonIcon} />
                </Button>
            </Tooltip>
            <Drawer
                anchor="left"
                open={isOpened}
                onClose={closeModal}
                slotProps={muiSx.burgerMenuDrawerPaper}
            >
                <List disablePadding>
                    <div className="absolute top-0 right-0 z-10">
                        <CloseModalButton onClick={closeModal} />
                    </div>
                    <ListItem className="mb-2">
                        <h4 className="m-0 text-lg font-semibold text-gray-900">{uiTexts.filters}</h4>
                    </ListItem>
                    <ListItem className="mb-1">
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>{uiTexts.tags}</InputLabel>
                            <Select
                                label={uiTexts.tags}
                                multiple
                                value={selectedTags}
                                onChange={onTagChange}
                                sx={muiSx.burgerMenuSelect}
                            >
                                {Object.entries(postTags).map(([key, value], i) => (
                                    <MenuItem value={key} key={i}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>{uiTexts.category}</InputLabel>
                            <Select
                                label={uiTexts.category}
                                multiple
                                value={selectedCategory}
                                onChange={onCategoryChange}
                                sx={muiSx.burgerMenuSelect}
                            >
                                {Object.entries(postCategories).map(([key, value], i) => (
                                    <MenuItem value={key} key={i}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem className="flex gap-2">
                        <Button
                            variant="outlined"
                            className="w-full"
                            onClick={onApplyClick}
                            sx={muiSx.buttonNoTextTransform}
                        >
                            {uiTexts.apply}
                        </Button>
                        <Button
                            variant="outlined"
                            className="w-full"
                            onClick={onResetClick}
                            sx={muiSx.buttonNoTextTransform}
                        >
                            {uiTexts.reset}
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}
