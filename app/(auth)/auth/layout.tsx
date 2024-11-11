import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <div className="bg-gradient-to-b from-primary from-60% to-40% to-white h-screen px-5 sm:px-10 md:px-20">
        <div className="py-8 max-w-[1500px] mx-auto">
          <Image
          className="mb-3"
            src={"/logo.png"}
            alt="Logo"
            height={30}
            width={100}
            unoptimized={false}
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default layout;
