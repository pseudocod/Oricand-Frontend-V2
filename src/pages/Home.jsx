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
      <SidebarHeader />

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

          {/* <DropSection
            title={drop.title}
            subtitle={drop.label}
            description={drop.description}
            imageSrc={drop.imageSrc}
            flip={i % 2 === 1}
          /> */}
          <PoeticLine text="crafted in passing moments" />
        </div>
      ))}

      {/* <PoeticLine text="Brewed in minor key." /> */}

      <Footer />
      {/* <HeroSection /> */}
      {/* <ManifestoSection /> */}
      {/* <DropTeaser /> */}
      {/* <MoodVideoSection /> */}
      {/* <Footer /> */}
    </>
  );
}
