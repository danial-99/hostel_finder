import AboutUs from "@/components/user/AboutUs";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import Hero from "@/components/user/Hero";
import HostelList from "@/components/user/HostelList";
import MobileApp from "@/components/user/MobileApp";
import Testimonials from "@/components/user/Testimonials";
import TopRatedHostels from "@/components/user/TopRatedHostels";
import WhyChooseUs from "@/components/user/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <TopRatedHostels />
        <HostelList />
        <AboutUs />
        <WhyChooseUs />
        <Testimonials />
        <MobileApp />
      </main>
      <Footer />
    </div>
  )
}