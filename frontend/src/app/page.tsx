import Hero from "@/components/Hero";
import CanHelp from "@/components/CanHelp";
import Area from "@/components/Area";
import SwiperCarousel from "@/components/Swiper";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function Home() {
  return (

    <main className="flex flex-col gap-[7rem]">

      <Hero />

      <CanHelp />
      
      <Area />

      <SwiperCarousel />

      <Banner />

      <Footer />

    </main>

  );

}
