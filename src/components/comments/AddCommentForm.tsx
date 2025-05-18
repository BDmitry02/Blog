import { useActionState, startTransition } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { CircularProgress, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { CommonTextInput } from "@/components/CommonFormInputs/CommonTextInput";
import {
    AddComment,
    addCommentInitialValues,
    addCommentValidationSchema,
} from "@/components/comments/comment-data";
import { addNewComment, onCommentFormSubmit } from "@/components/comments/AddCommentForm.funcs";
import { RootState } from "@/tools/redux/store";
import { CommentWithAuthor } from "@/tools/types/comment";
import { ParamVoidFunc } from "@/tools/types/funcs";

interface AddCommentFormProps {
    postId: string;
    onOptimisticAdd: ParamVoidFunc<CommentWithAuthor>;
    setComments: ParamVoidFunc<string>;
}

export function AddCommentForm({ postId, onOptimisticAdd, setComments }: AddCommentFormProps) {
    const user = useSelector((state: RootState) => state.user);

    const [newComment, setNewComment, isCommentPublishing] = useActionState(
        addNewComment,
        addCommentInitialValues,
    );

    function onSubmit(values: AddComment) {
        startTransition(() => {
            onCommentFormSubmit(values, postId, user, setComments, onOptimisticAdd, setNewComment);
        });
    }

    if (!user.userId) {
        return (
            <div className="mb-2 flex items-center rounded-md p-2 shadow-sm">
                <p className="text-gray-500">Please sign in to add a comment.</p>
            </div>
        );
    }
    return (
        <Formik
            initialValues={newComment}
            enableReinitialize
            validate={withZodSchema(addCommentValidationSchema)}
            onSubmit={(values, actions) => {
                onSubmit(values);
                actions.resetForm();
            }}
        >
            <Form className="flex items-center gap-1">
                <div className="w-full">
                    <CommonTextInput type="text" name="content" placeholder="Write a comment..." />
                </div>
                <div className="flex items-center">
                    {isCommentPublishing ? (
                        <CircularProgress size={24} />
                    ) : (
                        <IconButton type="submit" color="primary" disabled={isCommentPublishing}>
                            <SendIcon />
                        </IconButton>
                    )}
                </div>
            </Form>
        </Formik>
    );
}
