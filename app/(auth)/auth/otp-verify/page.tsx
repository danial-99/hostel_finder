import AuthLayout from "../(components)/AuthLayout";
import Typography from "@/components/Custom/Typography";
import OTPVerificationForm from "./(components)/otp-verification";

const Page = () => {
  return (
    <>
      <AuthLayout
        title={"Forgot Password"}
        subTitle={"Verify Your Identity"}
        description="Enter the OTP sent to your email to securely access your account and continue booking or managing your hostel."
      >
        <Typography
          variant="h4"
          className="text-[32px] font-medium"
        >
          OTP Verification
        </Typography>
        <Typography
          className="text-base font-medium text-muted-foreground mt-[42px]"
        >
          Enter the verification code we just sent on your email address
        </Typography>
        <OTPVerificationForm />
      </AuthLayout>
    </>
  );
};

export default Page;
