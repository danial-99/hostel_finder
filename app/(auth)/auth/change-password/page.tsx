import AuthLayout from "../(components)/AuthLayout";
import Typography from "@/components/Custom/Typography";
import ChangePasswordForm from "./(components)/change-password";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <AuthLayout
        title={"Change Your password"}
        subTitle={"Seamless Access to Book and Manage Your Hostel Experience"}
        description="Ready to update your password? Enter a new one to keep your hostel account secure and get back to finding or managing your perfect stay"
      >
        {false ? (
          <>
            <Typography variant="h4" className="text-[32px] font-medium">
              Change Your Password
            </Typography>
            <Typography className="text-base font-medium text-muted-foreground mt-6">
              Enter the verification code we just sent on your email address
            </Typography>
            <ChangePasswordForm />
          </>
        ) : (
          <>
            <div className="">
              <Image
                className="mx-auto mb-9"
                src={"/Successmark.svg"}
                alt="success"
                height={100}
                width={100}
              />
              <Typography
                variant="h5"
                className="text-foreground font-extrabold text-[26px] text-center"
              >
                Password Changed!
              </Typography>
              <Typography
                variant="h5"
                className="font-normal text-base text-center text-muted-foreground mb-[230px]"
              >
                Your password has been changed successfully.
              </Typography>
              <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                <Link href={'/login'}>
                Back to Login
                </Link>
              </Button>
            </div>
          </>
        )}
      </AuthLayout>
    </>
  );
};

export default Page;
