import { Post } from "@/tools/types/post";
import { z } from "zod";

export type AddPostValues = Omit<Post, "authorId" | "createdAt" | "id">;

export const addPostInitialValues = {
    title: "",
    content: "",
    readingTime: 0,
    tags: [],
    category: "",
};

export const postFormVariants = {
    edit: 0,
    create: 1,
} as const;

export type PostFormVariant = (typeof postFormVariants)[keyof typeof postFormVariants];

export const addPostFormValidationSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be at most 100 characters")
        .nonempty("Enter the title"),

    content: z.string().min(10, "Content must be at least 10 characters").nonempty("Enter the content"),

    readingTime: z
        .number({
            required_error: "Enter reading time",
            invalid_type_error: "Reading time must be a number",
        })
        .min(1, "Reading time must be at least 1 minute"),

    tags: z.array(z.string()).min(1, "Select at least one tag"),

    category: z.string().nonempty("Select a category"),
});
