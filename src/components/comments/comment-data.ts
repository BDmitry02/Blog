import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export interface AddComment {
    content: string;
}

export interface AddCommentWithAdditionalData extends AddComment {
    postId: string;
    authorId: string;
    createdAt: Timestamp;
}

export const addCommentValidationSchema = z.object({
    content: z.string().min(1, "Comment cannot be empty").max(500, "Comment is too long"),
});

export const addCommentInitialValues = {
    content: "",
};
