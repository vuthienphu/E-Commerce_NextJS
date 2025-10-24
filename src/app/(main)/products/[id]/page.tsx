'use client';

import {useParams  } from 'next/navigation';
import ProductDetails from "@/component/productdetails/ProductDetails";

const Product = () =>{
  const { id } = useParams();
  return <ProductDetails id={id as string} />;
}
export default Product;