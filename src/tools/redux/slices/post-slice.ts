import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where,
    writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { revalidatePosts } from "@/tools/functions/error/revalidate/revalidatePosts";
import { Post, PostWithoutTimeStamp } from "@/tools/types/post";
import { dbCollections } from "@/tools/constants/db/db-collections";
import { postsCollectionsProps } from "@/tools/constants/db/collections-props";
import { getAllPostsFromDB } from "@/tools/functions/db/posts";

interface PostsState {
    posts: Post[];
}

const initialState: PostsState = { posts: [] };

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<Post[]>) {
            state.posts = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.posts.unshift(action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
                state.posts = state.posts.filter((post) => post.id !== action.payload);
            })
            .addCase(
                updatePost.fulfilled,
                (state, action: PayloadAction<{ id: string; data: Partial<Post> }>) => {
                    const { id, data } = action.payload;
                    const post = state.posts.find((p) => p.id === id);
                    if (post) {
                        Object.assign(post, data);
                    }
                },
            )
            .addCase(getAllPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload;
            })
            .addCase(getFilteredPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload;
            });
    },
});

export const createPost = createAsyncThunk("posts/createPost", async (postData: PostWithoutTimeStamp) => {
    const timestamp = Timestamp.now();

    const postWithTimestamp = {
        ...postData,
        createdAt: timestamp,
    };

    const docRef = await addDoc(collection(db, dbCollections.posts), postWithTimestamp);

    await revalidatePosts();

    return {
        id: docRef.id,
        ...postData,
        createdAt: timestamp.toDate().toISOString(),
    };
});

export const deletePost = createAsyncThunk("posts/deletePost", async (postId: string) => {
    const commentsRef = collection(db, dbCollections.comments);

    const q = query(commentsRef, where(postsCollectionsProps.postId, "==", postId));
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db);

    querySnapshot.forEach((docSnap) => {
        batch.delete(docSnap.ref);
    });

    await batch.commit();
    await deleteDoc(doc(db, dbCollections.posts, postId));

    await revalidatePosts();

    return postId;
});

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({ id, data }: { id: string; data: Partial<Post> }) => {
        const postRef = doc(db, dbCollections.posts, id);
        await updateDoc(postRef, data);

        await revalidatePosts();

        return { id, data };
    },
);

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    return await getAllPostsFromDB();
});

export const getFilteredPosts = createAsyncThunk(
    "posts/getFilteredPosts",
    async ({ selectedTags, selectedCategory }: { selectedTags: string[]; selectedCategory: string[] }) => {
        let posts = await getAllPostsFromDB();

        if (selectedTags.length) {
            posts = posts.filter((post) => post.tags.some((tag) => selectedTags.includes(tag)));
        }

        if (selectedCategory.length) {
            posts = posts.filter((post) => selectedCategory.includes(post.category));
        }

        return posts;
    },
);

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
