import { unstable_cache } from "next/cache";
import { AddPost } from "@/components/posts/add-post/AddPost";
import { PostList } from "@/components/posts/post-list/PostList";
import { nextCacheTags } from "@/tools/constants/tags/next-cache-tags";
import { getAllPostsFromDB } from "@/tools/functions/db/posts";

const getCachedPosts = unstable_cache(getAllPostsFromDB, [nextCacheTags.posts], {
    tags: [nextCacheTags.posts],
});

export default async function Home() {
    const posts = await getCachedPosts();

    return (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(250px,1fr))] items-start justify-center gap-4 p-4 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
            <AddPost />
            <PostList initialPosts={posts} />
        </div>
    );
}
