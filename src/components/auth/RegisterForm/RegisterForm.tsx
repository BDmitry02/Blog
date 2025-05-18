"use client";
import { startTransition, useActionState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import Button from "@mui/material/Button";
import { CommonTextInput } from "@/components/CommonFormInputs/CommonTextInput";
import { registerFormInitialValues } from "@/components/auth/initial-values";
import { registerFormValidationSchema } from "@/components/auth/validation-schemas";
import { CloseModalButton } from "@/components/modal-window/CloseModalButton";
import { AppDispatch } from "@/tools/redux/store";
import { registerUser } from "@/tools/redux/slices/user-slice";
import { errorMessages } from "@/tools/constants/errors/error-messages";
import { usersCollectionsProps } from "@/tools/constants/db/collections-props";

interface UserRegisterValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    error?: string;
}

export function RegisterForm() {
    const dispatch = useDispatch<AppDispatch>();

    const [registerData, setRegisterData, isLoading] = useActionState(
        onRegisterUser,
        registerFormInitialValues,
    );

    async function onRegisterUser(prevState: UserRegisterValues, values: UserRegisterValues) {
        try {
            await dispatch(registerUser(values)).unwrap();

            window.history.back();

            return {
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                error: undefined,
            };
        } catch (error) {
            console.error(error);
            return { ...prevState, error: errorMessages.registerError };
        }
    }

    const onCloseModal = useCallback(() => {
        window.history.back();
    }, []);

    return (
        <div className="flex flex-col gap-5 p-5">
            <div className="absolute top-4 right-4">
                <CloseModalButton onClick={onCloseModal} />
            </div>
            <h2 className="text-center">Sign up</h2>
            <Formik
                initialValues={registerData}
                validate={withZodSchema(registerFormValidationSchema)}
                onSubmit={(values: UserRegisterValues) => startTransition(() => setRegisterData(values))}
            >
                <Form className="flex flex-col gap-5">
                    <CommonTextInput
                        label="Full Name"
                        aria-required="true"
                        name={usersCollectionsProps.name}
                        type="text"
                        autoComplete="given-name"
                    />

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
                        autoComplete="new-password"
                    />
                    <CommonTextInput
                        label="Confirm the password"
                        aria-required="true"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                    />
                    {registerData.error && (
                        <div className="mb-2 font-medium text-red-500">{registerData.error}</div>
                    )}
                    <Button type="submit" variant="outlined" disabled={isLoading}>
                        Sign up
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}
