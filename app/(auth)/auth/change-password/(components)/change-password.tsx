import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Typography from "@/components/Custom/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { UpdatePassword } from "@/actions/authen/updatePassword";

const formSchema = z.object({
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()\-_+=<>?]/, "Password must contain at least one special character"),
  
  confirmPassword: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()\-_+=<>?]/, "Password must contain at least one special character")
    
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      path: ["confirmPassword"],
      message: "Passwords do not match",
      code: z.ZodIssueCode.custom,
    });
  };
})

const ChangePasswordForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      // Show a loading toast or some kind of feedback to the user
      toast({
        title: "Updating password...",
        description: "Please wait while we update your password.",
        variant: "default",
      });
  
      // Send the form data to the backend (assuming `updatePassword` is your API function)
      const formData = new FormData();
      formData.append("password", data.password);
      const response = await UpdatePassword(formData); // Pass the actual FormData object if needed
  
      // Handle the backend response
      if (response.status === 200) {
        // Success: Show a success toast and call onSuccess
        toast({
          title: "Password Updated Successfully!",
          description: response.message || "Your password has been updated.",
          variant: "default",
        });
        onSuccess(); // Call onSuccess when the password update is successful
      } else {
        // Failure: Show an error toast based on the response message
        toast({
          title: "Failed to Update Password",
          description: response.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Show a general error toast in case of an exception
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-[30px]">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  {...field}
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <Input
                  {...field}
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
