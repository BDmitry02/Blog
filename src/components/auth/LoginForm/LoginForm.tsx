"use client";
import { startTransition, useActionState, useCallback } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import Button from "@mui/material/Button";
import { CommonTextInput } from "@/components/CommonFormInputs/CommonTextInput";
import { loginFormInitialValues } from "@/components/auth/initial-values";
import { loginFromValidationSchema } from "@/components/auth/validation-schemas";
import { navigationConstants } from "@/tools/constants/routing/navigation-constant";
import { AppDispatch } from "@/tools/redux/store";
import { loginUser } from "@/tools/redux/slices/user-slice";
import { CloseModalButton } from "@/components/modal-window/CloseModalButton";
import { errorMessages } from "@/tools/constants/errors/error-messages";
import { usersCollectionsProps } from "@/tools/constants/db/collections-props";

interface UserLoginValues {
    email: string;
    password: string;
    error?: string;
}

export function LoginForm() {
    const dispatch = useDispatch<AppDispatch>();

    const [loginData, setLoginData, isLoading] = useActionState(onLoginUser, loginFormInitialValues);

    async function onLoginUser(prevState: UserLoginValues, values: UserLoginValues) {
        try {
            await dispatch(loginUser(values)).unwrap();

            window.history.back();

            return {
                email: values.email,
                password: values.password,
                error: undefined,
            };
        } catch (error) {
            console.error(error);
            return { ...prevState, error: errorMessages.loginError };
        }
    }

    const onCloseModal = useCallback(() => {
        window.history.back();
    }, []);

    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="absolute top-4 right-4">
                <CloseModalButton onClick={onCloseModal} />
            </div>
            <h2 className="text-center">Sign in</h2>
            <Formik
                initialValues={loginData}
                validate={withZodSchema(loginFromValidationSchema)}
                onSubmit={(values: UserLoginValues) => startTransition(() => setLoginData(values))}
            >
                <Form className="flex flex-col gap-5">
                    <CommonTextInput
                        label="Email"
                        aria-required="true"
                        name={usersCollectionsProps.email}
                        type="email"
                        autoComplete="email"
                    />
                    <CommonTextInput
                        label="Password"
                        aria-required="true"
                        name={usersCollectionsProps.password}
                        type="password"
                        autoComplete="current-password"
                    />
                    {loginData.error && (
                        <div className="mb-2 font-medium text-red-500">{loginData.error}</div>
                    )}
                    <Link href={navigationConstants.register} className="text-sm underline">
                        Sign up
                    </Link>
                    <Button type="submit" variant="outlined" disabled={isLoading}>
                        Sign in
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}
