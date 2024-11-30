import AboutUs from "@/components/user/AboutUs";
import ContactPage from "@/components/user/Contact";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import Hero from "@/components/user/Hero";
import MobileApp from "@/components/user/MobileApp";
import Testimonials from "@/components/user/Testimonials";
import TopRatedHostels from "@/components/user/TopRatedHostels";
import WhyChooseUs from "@/components/user/WhyChooseUs";

export default function Home() {
  return (
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow'>
          <h1>Hello user</h1>
          <Hero />
          <TopRatedHostels />
          <AboutUs />
          <WhyChooseUs />
          <Testimonials />
          <MobileApp />
          <ContactPage />
        </main>
        <Footer />
      </div>
  );
}
