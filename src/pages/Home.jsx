import DropThemeScene from "../components/sections/DropThemeScene";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import Marquee from "../components/sections/Marquee";
import PoeticLine from "../components/ui/PoeticLine";
import { useCategories } from "../hooks/useCategories";
import HighlightedProducts from "../components/ui/HighlightedProducts";

export default function Home() {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <HeroSection />
      <Marquee />
      <HighlightedProducts />
      <Marquee />

      {categories.map((category) => (
        <div key={category.id}>
          <DropThemeScene category={category} />
          <PoeticLine />
        </div>
      ))}
    </>
  );
}
