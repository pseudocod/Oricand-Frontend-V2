import { useParams } from "react-router-dom";
import { useProductsByCategory } from "../hooks/useProductsByCategory";
import { useCategory } from "../hooks/useCategory";
import { useScroll, useTransform } from "framer-motion";
import { themeConfig } from "../config/themeConfig";
import CategoryHero from "../components/category/CategoryHero";
import CategoryDescription from "../components/category/CategoryDescription";
import ProductsGrid from "../components/product/ProductsGrid";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const { products, loading: productsLoading } =
    useProductsByCategory(categoryId);
  const { category, loading: categoryLoading } = useCategory(categoryId);
  const { scrollY } = useScroll();

  const heroScale = useTransform(scrollY, [0, 500], [1.1, 1]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleY = useTransform(scrollY, [0, 500], [0, 150]);

  if (productsLoading || categoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-lg animate-pulse">Loading Drop...</div>
      </div>
    );
  }

  if (!category) return null;

  const theme = themeConfig[category.theme] || themeConfig.default;

  return (
    <div className={`min-h-screen bg-offwhite ${theme.gradient}`}>
      <CategoryHero
        category={category}
        heroScale={heroScale}
        heroOpacity={heroOpacity}
        titleY={titleY}
        theme={theme}
      />

      <CategoryDescription description={category.description} theme={theme} />
      <ProductsGrid products={products} categoryName={category.name} />
    </div>
  );
}
