"use client";

import { setSession } from "@/lib/auth";
import { LoginFormSchema } from "@/lib/definitions";
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
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Login } from "@/actions/authen/login";
import { useAuth } from "@/hooks/useAuth";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { loginHook } = useAuth();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const result: any = await Login(formData);

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
          case 404:
            toast({
              title: "User Not Found",
              description: "No account found with this email.",
              variant: "destructive",
            });
            break;
          case 401:
            toast({
              title: "Invalid Credentials",
              description: "Please check your email and password.",
              variant: "destructive",
            });
            break;
          case 500:
            toast({
              title: "Server Error",
              description:
                "An unexpected error occurred. Please try again later.",
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "Login Failed",
              description: result.error || "An error occurred during login.",
              variant: "destructive",
            });
        }
      } else if (result) {
        loginHook(result.data, result.data.token);
        setSession(result.data.token);
        // Login successful
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully.",
          variant: "default",
        });
        // TODO: Handle successful login (e.g., store user data, redirect)
        router.push(
          result.data.role === "USER"
            ? "/"
            : result.data.role === "ADMIN"
            ? "/admin/dashboard"
            : result.data.role === "SUPER-ADMIN"
            ? "/super-admin/dashboard"
            : "/"
        ); // Adjust the route as needed

        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-[152px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="email"
                  placeholder="Enter your email"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                  placeholder="Enter your password"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center flex-wrap gap-x-3 gap-y-2 mb-4">
            <FormField
              control={form.control}
              name={"remember"}
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-start items-center gap-x-2">
                    <Checkbox value={field.value} onSelect={field.onChange} />
                    <FormLabel className="text-muted-foreground text-xs">
                      Remember me
                    </FormLabel>
                  </div>
                  <FormControl>
                    <FormMessage />
                  </FormControl>
                </FormItem>
              )}
            />
            <Link
              href={"/auth/forgot-password"}
              className="text-xs text-primary font-normal whitespace-nowrap"
            >
              Forget Password
            </Link>
          </div>
          <Button
            // type="submit"
            disabled={isLoading}
            className="flex justify-center items-center gap-1 w-full text-white bg-secondary hover:bg-secondary/90"
          >
            {isLoading && (
              <Loader2 className="animate-spin text-white h-4 w-4" />
            )}
            <Typography variant="span">Login</Typography>
          </Button>
        </form>
      </Form>

      <Typography className="text-base font-medium text-center mt-6 mx-auto">
        {`Don't have an account?`}{" "}
        <Link href={"/auth/register"} className="text-primary">
          Register Now
        </Link>
      </Typography>
    </div>
  );
};

export default LoginForm;
