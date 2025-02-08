import { z } from "zod";

export const SignupFormSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine((email) => {
      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }, "Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: z.string(),
  "terms&Conditions": z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
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
