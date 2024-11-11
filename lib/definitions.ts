import { z } from "zod";

export const SignupFormSchema = z.object({
  role: z.string().min(1, "Role is required"),
  username: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email()
    .min(5, {
      message: "email must be 5 characters",
    }),
  password: z.string(),
  // .refine(
  //   (value) => {
  //     return (
  //       value.length >= 8 &&
  //       /[A-Z]/.test(value) &&
  //       /[!@#$%^&*()\-_+=<>?]/.test(value) &&
  //       /[0-9]/.test(value)
  //     );
  //   },
  //   {
  //     message: "Password must contain at least 8 characters long",
  //   }
  // ),
  confirmPassword: z.string(),
  // .refine(
  //   (value) => {
  //     return (
  //       value.length >= 8 &&
  //       /[A-Z]/.test(value) &&
  //       /[!@#$%^&*()\-_+=<>?]/.test(value) &&
  //       /[0-9]/.test(value)
  //     );
  //   },
  //   {
  //     message: "Password must contain at least 8 characters long",
  //   }
  // ),
  "terms&Conditions": z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(5, {
      message: "email must be 5 characters",
    }),
  password: z.string(),
  // .refine(
  //   (value) => {
  // //     return (
  // //       value.length >= 8 &&
  // //       /[A-Z]/.test(value) &&
  // //       /[!@#$%^&*()\-_+=<>?]/.test(value) &&
  // //       /[0-9]/.test(value)
  // //     );
  // //   },
  // //   {
  // //     message: "Password must contain at least 8 characters long",
  // //   }
  // // ),
  remember: z.boolean(),
});

export const ForgetPasswordformSchema = z.object({
  email: z
    .string()
    .email()
    .min(5, {
      message: "email must be 5 characters",
    }),
});
