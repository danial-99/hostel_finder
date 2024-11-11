import AuthLayout from "../(components)/AuthLayout";
import Typography from "@/components/Custom/Typography";
import ForgotPasswordForm from "./(components)/forgot-password";

const Page = () => {
  return (
    <>
      <AuthLayout
        title={"Forgot Password"}
        subTitle={"Seamless Access to Book and Manage Your Hostel Experience"}
        description="Forgot your password? No worries! Enter your email to reset it and get back to finding or managing the perfect hostel stay."
      >
        <Typography
          variant="h4"
          className="text-[32px] font-medium"
        >
          Forgot Password?
        </Typography>
        <Typography
          className="text-base font-medium text-muted-foreground mt-6"
        >{`
          Don't worry it occurs. please enter the email address linked with your account.
        `}
        </Typography>
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  );
};

export default Page;
