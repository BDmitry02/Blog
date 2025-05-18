import { startTransition, useActionState, useEffect, useOptimistic, useState } from "react";
import { AddCommentForm } from "@/components/comments/AddCommentForm";
import { getComments } from "@/components/comments/Comments.funcs";
import { CommentWithAuthor } from "@/tools/types/comment";

interface CommentsProps {
    postId: string;
}

export function Comments({ postId }: CommentsProps) {
    const [comments, setComments, isCommentLoading] = useActionState(getComments, []);
    const [optimisticComments, setOptimisticComment] = useOptimistic<CommentWithAuthor[]>(comments);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        setIsInitialLoading(true);
        startTransition(() => setComments(postId));
    }, [postId, setComments]);

    const onOptimisticAdd = (comment: CommentWithAuthor) => {
        startTransition(() => setOptimisticComment((prev) => [comment, ...prev]));
    };

    useEffect(() => {
        if (comments.length > 0) {
            setIsInitialLoading(false);
        }
    }, [isCommentLoading, comments]);

    return (
        <section className="max-w-full rounded-xl bg-gray-50 p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Comments</h2>
            {isCommentLoading && isInitialLoading ? (
                <ul className="m-0 list-none p-0">
                    {[...Array(3)].map((_, i) => (
                        <li key={i} className="mb-4">
                            <div className="mb-1.5 h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                            <div className="h-3 w-4/5 animate-pulse rounded bg-gray-200" />
                        </li>
                    ))}
                </ul>
            ) : optimisticComments.length === 0 ? (
                <div>
                    <p className="mb-3 text-gray-400">No comments yet. Be the first to comment!</p>
                    <AddCommentForm
                        postId={postId}
                        onOptimisticAdd={onOptimisticAdd}
                        setComments={setComments}
                    />
                </div>
            ) : (
                <div>
                    <ul className="m-0 mb-4 max-h-60 list-none overflow-y-auto p-0">
                        {optimisticComments.map((comment) => (
                            <li
                                key={comment.id}
                                className="mb-3 rounded-lg border border-gray-200 bg-white p-3"
                            >
                                <div className="mb-1 text-xs font-semibold text-gray-700">
                                    {comment.authorName}
                                </div>
                                <div className="text-base break-words text-gray-900">{comment.comment}</div>
                            </li>
                        ))}
                    </ul>
                    <AddCommentForm
                        postId={postId}
                        onOptimisticAdd={onOptimisticAdd}
                        setComments={setComments}
                    />
                </div>
            )}
        </section>
    );
}
