import ProductDetails from "@/component/productdetails/ProductDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  return <ProductDetails id={id} />;
}
