import AuthLayout from "../(components)/AuthLayout";
import Typography from "@/components/Custom/Typography";
import LoginForm from "./(components)/login";

const Page = () => {
  return (
    <>
      <AuthLayout
        title={"Login Into"}
        subTitle={"Seamless Access to Book and Manage Your Hostel Experience"}
        description="Welcome back! Guests can easily find and book hostels, while owners manage bookings and listings in one place. Let’s make every stay amazing!"
      >
        <Typography
          variant="h4"
          className="text-[32px] font-medium text-center"
        >
          Welcome back! Glad to see you , Again!
        </Typography>
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default Page;
