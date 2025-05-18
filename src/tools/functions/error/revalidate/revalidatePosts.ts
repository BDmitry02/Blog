"use server";

import { nextCacheTags } from "@/tools/constants/tags/next-cache-tags";
import { revalidateTag } from "next/cache";

export async function revalidatePosts() {
    "use server";

    revalidateTag(nextCacheTags.posts);
}
