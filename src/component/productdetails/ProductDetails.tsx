'use client'
import Image from "next/image";
import { useState } from "react";
import './css/productdetails.css';
import useSWR from 'swr';
import { Product } from '@/type/product';
interface Prop{
  id:string;
}


const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ProductDetails = ({id}:Prop) =>{
const { data, error, isLoading } = useSWR<Product>(
    id ? `http://127.0.0.1:8000/api/products/${id}` : null,
    fetcher
  )



  console.log('✅ data nhận được:', data)
const[quantity,setQuantity] = useState<number>(1);

  if (isLoading) return <p>Đang tải...</p>
  if (error) return <p>Lỗi khi tải dữ liệu ❌</p>
  if (!data) return <p>Không tìm thấy sản phẩm</p>

const handleMinus = (quantity:number)=>{
  if(quantity<=1){
  return;
}
setQuantity(quantity-1);

}
const handleAdd = (quantity:number)=>{
setQuantity(quantity+1);
}
/*
const handleBuyNow = () => {
    // Gói dữ liệu cần truyền
    const query = new URLSearchParams({
      name: name || "",
      size: size || "",
      price: price || "",
      rateSell: rateSell || "",
      quantity: quantity.toString()
    }).toString();

    // Điều hướng sang trang /buy
    router.push(`/buy?${query}`);
  };

   const handleAddToCart = () => {
    if (!name) return;

    const newItem = { src, name, size, price, priceNotSell,rateSell,countRate,quantity};

    // lấy giỏ hàng hiện tại từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // kiểm tra nếu sản phẩm đã tồn tại thì cộng dồn
    const existingIndex = cart.findIndex((item:CartItem) => item.name === name && item.size === size);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(newItem);
    }

    // lưu lại vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Sản phẩm đã được thêm vào giỏ hàng!");
    console.log(cart);
  };
  */
return(
  <div className="container">
    <div className="productdetails">
      <Image className="img" src={data.image_url} alt={data.name} width={316} height={344} />
<div className="info-product">
 <h2>{data.name}</h2>
 <h2>Size: {data.size}</h2>
  <p className="mt-12">⭐⭐⭐⭐⭐ {data.countRate} Rating</p>
      <p className="price mt-12">${data.original_price-data.original_price*data.discount_percent/100}</p>
    <div className="original-price">
      <p><s>{data.original_price}</s></p>
      <p className="ml-24">{data.discount_percent}%</p>
    </div>
     <div className="quantity">
      <p>Quantity</p>
      <button className="ml-24" onClick={()=>handleMinus(quantity)}>-</button>
      <p className="count-quantity">{quantity}</p>
      <button onClick={()=>handleAdd(quantity)}>+</button>
     </div>
     <div className="btn-group">
      <button className="btn-buy">Buy Now</button>
      <button className="ml-24 btn-cart">Add To Cart</button>
     </div>
</div>
     </div>
   
    <div className="seller-info">
      <div className="seller-col">
        <p className="label">Sold By:</p>
        <p className="seller-name">NIKE company</p>
      </div>

      <div className="seller-col">
        <p className="label">Services:</p>
        <p className="service-item">- 7 Days Return</p>
        <p className="service-item">- Warranty not available</p>
      </div>

      <div className="seller-col">
        <p>Cash on Delivery</p>
        <p>Standard Delivery : 1-3 jan</p>
        <p>Lahore, Pakistan</p>
      </div>
    </div>
    </div>
)
}
export default ProductDetails;