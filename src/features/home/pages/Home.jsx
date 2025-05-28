import { HeroSection, Marquee, PoeticLine } from "@/features/home";
import { DropThemeScene, drops } from "@/features/drops";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />

      {drops.map((drop) => (
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
          <PoeticLine text="crafted in passing moments" />
        </div>
      ))}
    </>
  );
}
