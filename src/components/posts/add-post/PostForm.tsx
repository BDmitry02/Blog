import { startTransition } from "react";
import { Form, Formik } from "formik";
import { ZodObject } from "zod";
import { withZodSchema } from "formik-validator-zod";
import { Button, MenuItem } from "@mui/material";
import { CommonTextInput } from "@/components/CommonFormInputs/CommonTextInput";
import { CommonSelectInput } from "@/components/CommonFormInputs/CommonSelectInput";
import { AddPostValues, PostFormVariant, postFormVariants } from "@/components/posts/add-post/post-data";
import { postCategories, postTags } from "@/tools/constants/posts/post-constants";
import { ParamVoidFunc } from "@/tools/types/funcs";
import { CircularProgress } from "@mui/material";
import { Post } from "@/tools/types/post";
import { postsCollectionsProps } from "@/tools/constants/db/collections-props";
import { uiTexts } from "@/tools/constants/ui/texts";

interface PostFormProps {
    postInitialValues: AddPostValues | Post;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postValidationSchema: ZodObject<any, any, any>;
    setPostData: ParamVoidFunc<AddPostValues>;
    isLoading: boolean;
    variant?: PostFormVariant;
}

export function PostForm({
    postInitialValues,
    postValidationSchema,
    setPostData,
    isLoading,
    variant = postFormVariants.create,
}: PostFormProps) {
    return (
        <Formik
            initialValues={postInitialValues}
            validate={withZodSchema(postValidationSchema)}
            onSubmit={(values: AddPostValues) => startTransition(() => setPostData(values))}
        >
            <Form>
                <div className="flex flex-col gap-6">
                    <h2 className="mb-2 text-center text-2xl font-bold">
                        {variant === postFormVariants.create ? uiTexts.createPost : uiTexts.editPost}
                    </h2>
                    <CommonTextInput
                        label={uiTexts.title}
                        aria-required="true"
                        name={postsCollectionsProps.title}
                        type="text"
                        className="w-full"
                    />
                    <CommonTextInput
                        label={uiTexts.content}
                        aria-required="true"
                        name={postsCollectionsProps.content}
                        type="text"
                        multiline
                        rows={8}
                        className="w-full"
                    />
                    <CommonTextInput
                        label={uiTexts.readingTime}
                        aria-required="true"
                        name={postsCollectionsProps.readingTime}
                        type="number"
                        className="w-full"
                    />
                    <CommonSelectInput
                        label={uiTexts.tags}
                        name={postsCollectionsProps.tags}
                        multiple
                        className="w-full"
                    >
                        {Object.entries(postTags).map(([key, value], i) => (
                            <MenuItem value={key} key={i}>
                                {value}
                            </MenuItem>
                        ))}
                    </CommonSelectInput>
                    <CommonSelectInput
                        label={uiTexts.category}
                        name={postsCollectionsProps.category}
                        className="w-full"
                    >
                        {Object.entries(postCategories).map(([key, value], i) => (
                            <MenuItem value={key} key={i}>
                                {value}
                            </MenuItem>
                        ))}
                    </CommonSelectInput>
                    <div className="mt-2 flex justify-center">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="outlined"
                            color="primary"
                            className="w-36 px-4 py-2 font-semibold text-white"
                        >
                            {isLoading ? <CircularProgress size={18} color="inherit" /> : "Publish"}
                        </Button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}
