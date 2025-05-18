import { z } from "zod";

export const loginFromValidationSchema = z.object({
    email: z.string().email("Wrong email address").nonempty("Enter email address"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Enter password"),
});

export const registerFormValidationSchema = z
    .object({
        name: z
            .string()
            .regex(/^[A-Za-zА-Яа-я\s]+$/, "The name should not contain numbers or special characters")
            .nonempty("Enter your name"),
        email: z.string().email("Wrong email address").nonempty("Enter email address"),
        password: z.string().min(6, "Password must be at least 6 characters").nonempty("Enter password"),
        confirmPassword: z.string().nonempty("Confirm the password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ["confirmPassword"],
    });
