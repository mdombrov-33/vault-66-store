import ProductsContainer from "@/components/products/ProductsContainer";

async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; search?: string }>;
}) {
  const layout = (await searchParams).layout || "grid";
  const search = (await searchParams).search || "";

  return <ProductsContainer layout={layout} search={search} />;
}

export default ProductsPage;
