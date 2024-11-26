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

  const { reset, handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof SignupFormSchema>) => {
    console.log("registering");
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const result = await signUp(formData);

      if (result.error) {
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
              title: "User Already Exists",
              description: "An account with this email already exists.",
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
              title: "Signup Failed",
              description: result.error || "An error occurred during signup.",
              variant: "destructive",
            });
        }
      } else {
        // Signup successful
        toast({
          title: "Signup Successful",
          description: "Your account has been created successfully.",
          variant: "default",
        });
        router.push("/otp-verification");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3 mb-4">
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
                      <FormLabel className="font-normal">
                        Hostel Owner
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"username"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="text"
                  placeholder="Username"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
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
                  placeholder="Password"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"confirmPassword"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                  placeholder="Confirm password"
                />
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"terms&Conditions"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <div className="flex justify-start items-center gap-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Typography className="text-muted-foreground text-xs">
                    I accept{" "}
                    <Link
                      href={"/terms-conditions"}
                      className="text-xs text-primary"
                    >
                      terms and conditions
                    </Link>
                  </Typography>
                </div>
                <FormMessage />
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
            <Typography variant="span">Register</Typography>
          </Button>
        </form>
      </Form>
      <Typography className="text-base font-medium text-center mt-6 mx-auto">
        Already have an account?{" "}
        <Link href={"/auth/login"} className="text-primary">
          Login Now
        </Link>
      </Typography>
    </div>
  );
};

export default SignupForm;
