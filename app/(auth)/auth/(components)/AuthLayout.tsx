import { FC } from "react";
import Image from "next/image";
import Typography from "@/components/Custom/Typography";

interface IProps {
  title: string;
  subTitle: string;
  description: string;
  children: React.ReactNode;
}

const AuthLayout: FC<IProps> = ({ title, subTitle, description, children }) => {
  return (
    <>
      <div className="block mx-auto md:flex md:items-start md:gap-2 drop-shadow-xl">
        <div className="hidden md:flex md:justify-between md:items-center md:gap-x-3 md:w-[55%]">
          <div className="">
            <Typography
              variant="h4"
              className="text-white font-semibold text-[34px] mb-2"
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              className="text-white font-normal text-2xl mb-4"
            >
              {subTitle}
            </Typography>
            <Typography className="text-white text-[13px] max-w -[311px]">
              {description}
            </Typography>
          </div>
            <Image
              className="w-[385px] h-[331px]"
              src={"/Saly-1.png"}
              alt="Logo"
              height={0}
              width={0}
              unoptimized={true}
            />
        </div>
        <div className="w-full md:w-[45%] rounded-[20px] bg-white px-[25px] md:px-[45px] py-[32px] md:py-[64px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
