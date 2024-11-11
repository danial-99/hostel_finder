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
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  password: z.string().refine(
    (value) => {
      return (
        value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[!@#$%^&*()\-_+=<>?]/.test(value) &&
        /[0-9]/.test(value)
      );
    },
    {
      message:
        "Password must contain at least 8 characters long",
    }
  ),
  confirmPassword: z.string().refine(
    (value) => {
      return (
        value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[!@#$%^&*()\-_+=<>?]/.test(value) &&
        /[0-9]/.test(value)
      );
    },
    {
      message:
        "Password must contain at least 8 characters long",
    }
  ),
});

const ChangePasswordForm = () => {
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { reset, handleSubmit } = form;

  const onSubmit = (data: any) => {
    console.log(data, 'form data');
  }
  
  return (
    <div className="mt-[30px]">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                  placeholder="New password"
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
          <Button
            disabled={false}
            className="flex justify-center items-center gap-1 w-full text-white bg-secondary hover:bg-secondary/90 mt-[100px]"
          >
            {false && <Loader2 className="animate-spin text-white h-4 w-4" />}
            <Typography variant="span">Change Password</Typography>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
