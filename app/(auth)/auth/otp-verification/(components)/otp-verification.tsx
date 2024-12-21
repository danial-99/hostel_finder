"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Replace with your actual input component
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import z from "zod";
import { optVerification } from "@/actions/authen/otpVerfiy";
import { useRouter } from "next/navigation";


// Define a simple schema with validation for the input field (check for non-null value)
const formSchema = z.object({
  inputValue: z.string().min(1, "This field is required"), // Ensure it is not empty
});

const SimpleForm = () => {
  const { toast } = useToast()
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputValue: "", // Default value for the input field
    },
  });

  const { handleSubmit, control, reset } = form;

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    try {
      const res = await optVerification(data); // Send OTP data to backend
    if (res) {
      toast({
        title: "Verification Successful",
        description: "Your account verified, please login now.",
        variant: "default",
      });
      router.push("/auth/login");
    } else {
      toast({
        title: "OTP verification failed!",
        description: "OTP verification failed!",
        variant: "destructive",
      });
    }
    console.log("Submitted data: ", data);
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong while submitting your data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="inputValue"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your otp here"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SimpleForm;
