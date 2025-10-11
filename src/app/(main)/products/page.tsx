'use client'
import { useSearchParams } from 'next/navigation';
import Products from "@/component/productdetails/ProductDetails";

const Product = () =>{
 const params = useSearchParams();
 const src = params.get('src')|| '';
    const name = params.get('name') || '';
  const size = params.get('size') || '';
  const price = params.get('price') || '';
  const priceNotSell = params.get('priceNotSell') || '';
  const rateSell = params.get('rateSell') || '';
  const countRate = Number(params.get('countRate')) || 0;

return(
    <div>
        <Products
        src = {src}
        name={name}
        size={size}
        price={price}
        priceNotSell={priceNotSell}
        rateSell={rateSell}
        countRate={countRate}
      />
    </div>
)
}
export default Product;