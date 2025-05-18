"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SinglePost } from "@/components/posts/single-post/SinglePost";
import { setPosts } from "@/tools/redux/slices/post-slice";
import { AppDispatch, RootState } from "@/tools/redux/store";
import { Post } from "@/tools/types/post";

interface PostListProps {
    initialPosts: Post[];
}
export function PostList({ initialPosts }: PostListProps) {
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.posts.posts);

    useEffect(() => {
        if (
            posts.length !== initialPosts.length ||
            posts.some((post, index) => post.id !== initialPosts[index]?.id)
        ) {
            dispatch(setPosts(initialPosts));
        }
    }, [initialPosts]);

    return (
        <>
            {posts.map((post) => (
                <SinglePost key={post.id} post={post} />
            ))}
        </>
    );
}
