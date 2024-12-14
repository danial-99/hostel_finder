"use client";

import { ForgetPasswordformSchema } from "@/lib/definitions";
import Typography from "@/components/Custom/Typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ForgetPassword } from "@/actions/authen/forgetPassword";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<any>({
    resolver: zodResolver(ForgetPasswordformSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof ForgetPasswordformSchema>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const result: any = await ForgetPassword(formData);
      if (!result.success) {
        // Handle different error scenarios based on status code
        switch (result.status) {
          case 400:
            toast({
              title: "Invalid Input",
              description: "Please check your email and try again.",
              variant: "destructive",
            });
            break;
          case 404:
            toast({
              title: "Email Not Found",
              description: "No account found with this email.",
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
        toast({
          title: "Requested Successfully",
          description: "OTP has been send to your email address.",
          variant: "default",
        }),
        router.push("/auth/otp-verify");

      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className="mb-[200px]">
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
          <Button
            disabled={isLoading}
            className="flex justify-center items-center gap-1 w-full text-white bg-secondary hover:bg-secondary/90"
          >
            {isLoading && (
              <Loader2 className="animate-spin text-white h-4 w-4" />
            )}
            <Typography variant="span">Submit</Typography>
          </Button>
        </form>
      </Form>
      <Typography className="text-base font-medium text-center mt-6 mx-auto">
        Remember Password?{" "}
        <Link href={"/auth/login"} className="text-primary">
          Login
        </Link>
      </Typography>
    </div>
  );
};

export default ForgotPasswordForm;
