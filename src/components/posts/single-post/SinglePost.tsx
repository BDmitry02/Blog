import { useActionState, useCallback, useOptimistic, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CloseModalButton } from "@/components/modal-window/CloseModalButton";
import { Comments } from "@/components/comments/Comments";
import { PostForm } from "@/components/posts/add-post/PostForm";
import {
    addPostFormValidationSchema,
    AddPostValues,
    postFormVariants,
} from "@/components/posts/add-post/post-data";
import { formatISOStringToUserFriendlyDate } from "@/tools/functions/date/date-converter";
import { Post } from "@/tools/types/post";
import { AppDispatch, RootState } from "@/tools/redux/store";
import { deletePost, updatePost } from "@/tools/redux/slices/post-slice";
import { useModal } from "@/tools/hooks/useModal";
import { muiSx } from "@/tools/constants/ui/mui-styles";

interface SinglePostProps {
    post: Post;
}

export function SinglePost({ post }: SinglePostProps) {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.user.userId);

    const { isOpened, openModal, closeModal } = useModal(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [editedPost, setEditedPost, isEditPostLoading] = useActionState(editPost, post);
    const [optimisticEditedPost, setOptimisticEditedPost] = useOptimistic(editedPost);

    async function editPost(prevState: Post, formValues: AddPostValues) {
        try {
            setOptimisticEditedPost({ ...post, ...formValues });

            await dispatch(updatePost({ id: prevState.id, data: formValues })).unwrap();

            setIsEditMode(false);

            return { ...post, ...formValues };
        } catch (error) {
            console.error(error);
            return prevState;
        }
    }

    const onModalOpen = useCallback(() => {
        openModal();
        setIsEditMode(false);
    }, [openModal]);

    const onModalClose = useCallback(() => {
        if (isEditMode) {
            setIsEditMode(false);
        } else {
            closeModal();
        }
    }, [isEditMode, closeModal]);

    const onEditButtonClick = useCallback(() => {
        setIsEditMode(true);
    }, []);

    const onDeleteButtonClick = useCallback(() => {
        dispatch(deletePost(optimisticEditedPost.id));
        closeModal();
    }, [optimisticEditedPost.id, dispatch, closeModal]);

    return (
        <>
            <Button
                className="flex h-36 w-full max-w-md flex-col items-start justify-between gap-4 rounded-2xl border bg-white p-5 text-left shadow-md transition-shadow hover:bg-gray-50 hover:shadow-lg"
                variant="outlined"
                onClick={onModalOpen}
                sx={muiSx.buttonNoTextTransform}
            >
                <h5 className="line-clamp-2 max-w-full overflow-hidden text-lg font-semibold break-words text-gray-900">
                    {optimisticEditedPost.title}
                </h5>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatISOStringToUserFriendlyDate(optimisticEditedPost.createdAt)}</span>
                    <span>•</span>
                    <span>{optimisticEditedPost.readingTime} min read</span>
                </div>

                {optimisticEditedPost.tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2">
                        {optimisticEditedPost.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </Button>
            <Modal open={isOpened} onClose={onModalClose}>
                <div className="absolute top-1/2 left-1/2 mt-4 box-border flex max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl sm:rounded-xl sm:p-4">
                    <div className="flex w-full justify-end">
                        <div className="flex items-center gap-1">
                            {isEditMode ? (
                                <IconButton
                                    aria-label="back"
                                    onClick={onModalClose}
                                    size="small"
                                    className="z-10"
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            ) : (
                                <>
                                    {userId === optimisticEditedPost.authorId && (
                                        <>
                                            <IconButton
                                                aria-label="edit"
                                                onClick={onEditButtonClick}
                                                size="small"
                                                className="z-10"
                                                sx={muiSx.burgerMenuEditIcon}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={onDeleteButtonClick}
                                                size="small"
                                                className="z-10"
                                                sx={muiSx.burgerMenuDeleteIcon}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                    <CloseModalButton onClick={onModalClose} />
                                </>
                            )}
                        </div>
                    </div>
                    {isEditMode ? (
                        <PostForm
                            postInitialValues={optimisticEditedPost}
                            postValidationSchema={addPostFormValidationSchema}
                            setPostData={setEditedPost}
                            isLoading={isEditPostLoading}
                            variant={postFormVariants.edit}
                        />
                    ) : (
                        <>
                            <h2 className="max-w-full text-left text-2xl leading-tight font-bold break-words text-gray-900">
                                {optimisticEditedPost.title}
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>
                                    {formatISOStringToUserFriendlyDate(optimisticEditedPost.createdAt)}
                                </span>
                                <span>•</span>
                                <span>{optimisticEditedPost.readingTime} min read</span>
                            </div>
                            <div className="text-sm font-medium">
                                Category:{" "}
                                <span className="font-normal text-blue-700 capitalize">
                                    {optimisticEditedPost.category}
                                </span>
                            </div>
                            <div className="border-t pt-6 text-base leading-relaxed break-words whitespace-pre-wrap text-gray-800">
                                {optimisticEditedPost.content}
                            </div>
                            {optimisticEditedPost.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 border-t border-b py-4">
                                    {optimisticEditedPost.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <Comments postId={optimisticEditedPost.id} />
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}
