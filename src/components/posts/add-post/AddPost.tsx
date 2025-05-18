"use client";
import { AppDispatch, RootState } from "@/tools/redux/store";
import { useActionState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "@mui/material";
import {
    addPostFormValidationSchema,
    addPostInitialValues,
    AddPostValues,
} from "@/components/posts/add-post/post-data";
import { PostForm } from "@/components/posts/add-post/PostForm";
import { createPost } from "@/tools/redux/slices/post-slice";
import { CloseModalButton } from "@/components/modal-window/CloseModalButton";
import { useModal } from "@/tools/hooks/useModal";
import { muiSx } from "@/tools/constants/ui/mui-styles";

export function AddPost() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const { isOpened, openModal, closeModal } = useModal(false);
    const [addPostData, setAddPostData, isLoading] = useActionState(addPost, addPostInitialValues);

    async function addPost(prevState: AddPostValues, formValues: AddPostValues) {
        try {
            const updatedValues = { ...formValues, authorId: user.userId };

            await dispatch(createPost(updatedValues)).unwrap();

            closeModal();

            return addPostInitialValues;
        } catch (error) {
            console.error(error);
            return prevState;
        }
    }

    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                onClick={openModal}
                disabled={!user.userId}
                aria-label="Create new post"
                className="mb-4 flex h-36 w-full max-w-md flex-col items-center justify-center gap-2 rounded-2xl border-2 border-blue-500 px-4 py-8 text-lg font-semibold shadow-md transition-colors duration-150 outline-none hover:bg-blue-50 focus:bg-blue-100"
                sx={muiSx.buttonNoTextTransform}
            >
                <span className="text-xl font-semibold tracking-tight">Create New Post</span>
            </Button>
            <Modal open={isOpened} onClose={closeModal}>
                <div className="absolute top-1/2 left-1/2 my-4 flex max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-2xl bg-white p-8 shadow-xl outline-none sm:rounded-xl sm:p-4">
                    <div className="absolute top-4 right-4">
                        <CloseModalButton onClick={closeModal} />
                    </div>
                    <PostForm
                        postInitialValues={addPostData}
                        postValidationSchema={addPostFormValidationSchema}
                        setPostData={setAddPostData}
                        isLoading={isLoading}
                    />
                </div>
            </Modal>
        </>
    );
}
