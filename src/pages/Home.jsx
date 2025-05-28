import DropThemeScene from "../components/DropThemeScene";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Marquee from "../components/Marquee";
import PoeticLine from "../components/PoeticLine";
import SidebarHeader from "../components/SidebarHeader";
import { drops } from "../data/drops";

export default function Home() {
  return (
    <>

      <HeroSection />
      <Marquee />

      {drops.map((drop, i) => (
        <div key={drop.id}>
          <DropThemeScene
            videoSrc={drop.videoSrc}
            phrase={drop.phrase}
            label={drop.label}
            textColor={drop.textColor}
            bg={drop.bg}
            font={drop.font}
            ctaHref={drop.ctaHref}
            ctaText={drop.ctaText}
            imageSrc={drop.imageSrc}
          />
          <PoeticLine />
        </div>
      ))}
    </>
  );
}
