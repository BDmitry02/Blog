import { addDoc, collection, Timestamp } from "firebase/firestore";
import {
    AddComment,
    addCommentInitialValues,
    AddCommentWithAdditionalData,
} from "@/components/comments/comment-data";
import { db } from "@/lib/firebase";
import { ParamVoidFunc } from "@/tools/types/funcs";
import { CommentWithAuthor } from "@/tools/types/comment";
import { StateUser } from "@/tools/types/user";
import { dbCollections } from "@/tools/constants/db/db-collections";

export async function addNewComment(prevState: AddComment, formValues: AddCommentWithAdditionalData) {
    try {
        await addDoc(collection(db, dbCollections.comments), {
            authorId: formValues.authorId,
            postId: formValues.postId,
            comment: formValues.content,
            createdAt: formValues.createdAt,
        });

        return addCommentInitialValues;
    } catch (error) {
        console.error(error);

        return prevState;
    }
}

export function onCommentFormSubmit(
    formValues: AddComment,
    postId: string,
    user: StateUser,
    setComments: ParamVoidFunc<string>,
    onOptimisticAdd: ParamVoidFunc<CommentWithAuthor>,
    setNewComment: ParamVoidFunc<AddCommentWithAdditionalData>,
) {
    const timestamp = Timestamp.now();

    const optimisticComment = {
        id: Math.random().toString(36).slice(2),
        postId,
        authorId: user.userId,
        comment: formValues.content,
        authorName: user.displayName,
        createdAt: timestamp.toDate().toISOString(),
    };

    onOptimisticAdd(optimisticComment);

    setNewComment({
        content: formValues.content,
        postId,
        authorId: user.userId,
        createdAt: timestamp,
    });

    setComments(postId);
}
