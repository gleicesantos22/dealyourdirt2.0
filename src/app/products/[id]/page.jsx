import ProductDetails from "@/components/product-page/ProductDetails";
import products from "../../../data/products.json";
import ProductHighlightSection from "@/components/product-page/ProductHighlightSection";
import ProductHighlightSection2nd from "@/components/product-page/ProductHighlightSection2nd";
import ProductHighlightSection3rd from "@/components/product-page/ProductHighlightSection3rd";
import ProductHighlightSection4th from "@/components/product-page/ProductHighlightSection4th";
import VideoSection from "@/components/product-page/VideoSection";
import NumberCounter from "@/components/product-page/NumberCounter";

export default async function ProductPage({ params }) {
  const { id } = await params; // Await params before destructuring

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="text-center py-10 text-red-600">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p>
          Please check the URL or go back to the{" "}
          <a href="/products" className="text-blue-500 underline">
            product list
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <ProductDetails product={product} />
      <ProductHighlightSection />
      <ProductHighlightSection2nd />
      <ProductHighlightSection3rd />
      <ProductHighlightSection4th />
      <VideoSection />
      <NumberCounter />
    </main>
  );
}
