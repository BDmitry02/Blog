export interface Post {
    id: string;
    title: string;
    content: string;
    readingTime: number;
    tags: string[];
    category: string;
    authorId: string;
    createdAt: string;
}

export type PostWithoutTimeStamp = Omit<Post, "createdAt" | "id">;
