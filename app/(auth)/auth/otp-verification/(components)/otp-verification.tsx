"use client";

import Typography from "@/components/Custom/Typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  otp: z.string(),
});

const OTPVerificationForm = () => {
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { reset, handleSubmit } = form;

  const onSubmit = (data: any) => {
    console.log(data, "form data");
  };

  return (
    <div className="mt-[42px]">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"otp"}
            render={({ field }) => (
              <FormItem className="mb-[200px] mx-auto flex justify-center items-center w-full">
                <InputOTP className="" size={80} maxLength={4}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
                <FormControl>
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={false}
            className="flex justify-center items-center gap-1 w-full text-white bg-secondary hover:bg-secondary/90 mb-11"
          >
            {false && <Loader2 className="animate-spin text-white h-4 w-4" />}
            <Typography variant="span">Verify</Typography>
          </Button>
        </form>
      </Form>
      <Typography className="text-base font-medium text-center mt-6 mx-auto">
        {`Didn't received code?`}{" "}
        <Button
          variant={"link"}
          onClick={() => console.log("code send successfully")}
          className="text-primary"
        >
          Resend
        </Button>
      </Typography>
    </div>
  );
};

export default OTPVerificationForm;
