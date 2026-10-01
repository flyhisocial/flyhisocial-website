import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import AIAutomation from "@/components/sections/AIAutomation";
import Process from "@/components/sections/Process";
import Packages from "@/components/sections/Packages";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <AIAutomation />
      <Process />
      <Packages />
      <Contact />
      <Footer />
    </>
  );
}
