'use client'
import Image from "next/image";
import { useState } from "react";
import './css/productdetails.css';
interface Prop{
  src?:string;
    name?:string;
   size?:string;
   price?:string;
   priceNotSell?: string;
   rateSell?:string;
   countRate?:number
}


const ProductDetails = ({src,name,size,price,priceNotSell,rateSell,countRate}:Prop) =>{

const[count,setCount] = useState<number>(1);

const handleMinus = (count:number)=>{
  if(count<=1){
  return;
}
setCount(count-1);

}
const handleAdd = (count:number)=>{
setCount(count+1);
}
return(
  <div className="container">
    <div className="productdetails">
      {src && <Image src={src} alt={name || ''} className="img" width={315} height={344} />}
<div className="info-product">
 <h2>{name} . {size}</h2>
  <p className="mt-12">⭐⭐⭐⭐⭐ {countRate} Rating</p>
      <p className="price mt-12">{price}</p>
    <div className="original-price">
      <p><s>{rateSell}</s></p>
      <p className="ml-24">{priceNotSell}</p>
    </div>
     <div className="quantity">
      <p>Quantity</p>
      <button className="ml-24" onClick={()=>handleMinus(count)}>-</button>
      <p className="count-quantity">{count}</p>
      <button onClick={()=>handleAdd(count)}>+</button>
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