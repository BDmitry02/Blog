import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CommentWithAuthor } from "@/tools/types/comment";
import { dbCollections } from "@/tools/constants/db/db-collections";
import { generalCollectionsProps, postsCollectionsProps } from "@/tools/constants/db/collections-props";
import { userConstants } from "@/tools/constants/user/user-constants";

export async function getComments(_: unknown, postId: string) {
    const q = query(
        collection(db, dbCollections.comments),
        where(postsCollectionsProps.postId, "==", postId),
        orderBy(generalCollectionsProps.createdAt, "desc"),
    );

    const snapshot = await getDocs(q);

    const commentsWithAuthors = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
            const comment = docSnap.data();
            const authorRef = doc(db, dbCollections.users, comment.authorId);
            const authorSnap = await getDoc(authorRef);
            const author = authorSnap.exists() ? authorSnap.data().name : userConstants.unknownUser;

            return {
                id: docSnap.id,
                ...comment,
                authorName: author,
            };
        }),
    );

    return commentsWithAuthors as CommentWithAuthor[];
}
