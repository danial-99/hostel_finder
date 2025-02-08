"use client";

import Typography from "@/components/Custom/Typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/authen/signup";
import { useToast } from "@/hooks/use-toast";
import { SignupFormSchema } from "@/lib/definitions";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      role: "USER",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      "terms&Conditions": false,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof SignupFormSchema>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const result = await signUp(formData);

      if (!result.success) {
        // Handle different error scenarios based on status code
        switch (result.status) {
          case 400:
            toast({
              title: "Invalid Input",
              description: "Please check your information and try again.",
              variant: "destructive",
            });
            break;
          case 409:
            toast({
              title: "Account Already Exists",
              description: result.message || "An account with this email already exists.",
              variant: "destructive",
            });
            break;
          case 500:
            toast({
              title: "Server Error",
              description: "An unexpected error occurred. Please try again later.",
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "Signup Failed",
              description: result.error || "An error occurred during signup.",
              variant: "destructive",
            });
        }
      } else {
        // Store signup data in session storage
        sessionStorage.setItem('signupData', JSON.stringify(data));

        if (result.isResend) {
          toast({
            title: "Account Exists",
            description: "A new verification code has been sent to your email.",
            variant: "default",
          });
        } else if (result.emailError) {
          toast({
            title: "Account Created",
            description: "Your account was created but we couldn't send the verification email. You can request a new code on the verification page.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Verification Required",
            description: "Please check your email for the verification code to complete registration.",
            variant: "default",
          });
        }
        
        // Redirect to OTP verification in all cases
        router.push("/auth/otp-verification");
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Register As</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="USER" />
                      </FormControl>
                      <FormLabel className="font-normal">User</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ADMIN" />
                      </FormControl>
                      <FormLabel className="font-normal">Hostel Owner</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms&Conditions"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Typography className="text-muted-foreground text-xs">
                    I accept{" "}
                    <Link href="/terms-conditions" className="text-primary">
                      terms and conditions
                    </Link>
                  </Typography>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-secondary hover:bg-secondary/90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Typography variant="span">Register</Typography>
          </Button>
        </form>
      </Form>
      <Typography className="text-base font-medium text-center mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary">
          Login Now
        </Link>
      </Typography>
    </div>
  );
};

export default SignupForm;