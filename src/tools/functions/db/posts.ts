import { db } from "@/lib/firebase";
import { dbCollections } from "@/tools/constants/db/db-collections";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { formateDateToISO } from "../date/date-converter";
import { generalCollectionsProps } from "@/tools/constants/db/collections-props";
import { Post } from "@/tools/types/post";

export async function getAllPostsFromDB() {
    const postsQuery = query(
        collection(db, dbCollections.posts),
        orderBy(generalCollectionsProps.createdAt, "desc"),
    );

    const snapshot = await getDocs(postsQuery);

    const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: formateDateToISO(data.createdAt),
        };
    });

    return posts as Post[];
}
