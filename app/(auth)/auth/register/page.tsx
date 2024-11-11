import AuthLayout from "../(components)/AuthLayout";
import Typography from "@/components/Custom/Typography";
import SignupForm from "./(components)/signup";

const Page = () => {
  return (
    <>
      <AuthLayout
        title={"Sign Up"}
        subTitle={"Create Your Hostel Finder Account"}
        description="Sign up to start booking your stay or manage your hostel. It’s quick, easy, and secure!"
      >
        <Typography
          variant="h4"
          className="text-[32px] font-medium text-center"
        >
          Hello! Register for an account
        </Typography>
        <SignupForm />
      </AuthLayout>
    </>
  );
};

export default Page;
