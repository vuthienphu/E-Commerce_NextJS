'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './css/sellproducts.css';
import aophong from './img/aophong.webp';
import danhgia from './img/—Pngtree—5 star rating icon reviews_12584719.jpg';

const SellProducts = () => {
  const products = [
    { name: 'Polo Shirt for men', size: 'Large size...', price: 'Rs.999', priceNotSell: '2000', rateSell: '-50%', countRate: 120 },
    { name: 'T-shirt Classic', size: 'Medium size...', price: 'Rs.899', priceNotSell: '1800', rateSell: '-50%', countRate: 95 },
    { name: 'Denim Jacket', size: 'XL size...', price: 'Rs.1599', priceNotSell: '3000', rateSell: '-47%', countRate: 180 },
    { name: 'Sneakers White', size: '42 EU', price: 'Rs.1999', priceNotSell: '3500', rateSell: '-43%', countRate: 210 },
    { name: 'Hoodie Oversize', size: 'L size...', price: 'Rs.1299', priceNotSell: '2500', rateSell: '-48%', countRate: 160 },
    { name: 'Formal Pants', size: '32 size...', price: 'Rs.1199', priceNotSell: '2000', rateSell: '-40%', countRate: 70 },
    { name: 'Watch', size: 'Standard', price: 'Rs.2599', priceNotSell: '4000', rateSell: '-35%', countRate: 190 },
    { name: 'Cap', size: 'Adjustable', price: 'Rs.499', priceNotSell: '900', rateSell: '-45%', countRate: 130 },
    { name: 'Socks Pack', size: 'Free size', price: 'Rs.299', priceNotSell: '600', rateSell: '-50%', countRate: 60 },
    { name: 'Leather Belt', size: 'Standard', price: 'Rs.699', priceNotSell: '1200', rateSell: '-42%', countRate: 88 },
    { name: 'Jeans Slim Fit', size: '30 size...', price: 'Rs.1399', priceNotSell: '2200', rateSell: '-36%', countRate: 150 },
    { name: 'Shirt Formal', size: 'M size...', price: 'Rs.999', priceNotSell: '1700', rateSell: '-41%', countRate: 102 },
  ];

  // danh sách sản phẩm đang hiển thị
  const [displayedProducts, setDisplayedProducts] = useState(products.slice(0, 6));

  // lấy 6 sản phẩm ngẫu nhiên
  const getRandomProducts = () => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };

  const handleShowMore = () => {
    const newProducts = getRandomProducts();
    setDisplayedProducts(prev => [...prev, ...newProducts]); // thêm 6 sản phẩm mới vào danh sách cũ
  };

  return (
    <div className="sell-products">
      <h2>Best Selling Products</h2>
      <div className="line"></div>

      <div className="sell-product-list">
        {displayedProducts.map((item, index) => (
          <div key={index} className="sell-product-item">
           <Link
              href={{
                pathname: '/products',
                query: {
                  src:'/img/aophong.webp',
                  name: item.name,
                  size: item.size,
                  price: item.price,
                  priceNotSell: item.priceNotSell,
                  rateSell: item.rateSell,
                  countRate: item.countRate,
                },
              }}
            >
              <Image className="img-shirt" src={aophong} alt="Áo" />
            </Link>
           <Link href={{
                pathname: '/products',
                query: {
                  name: item.name,
                  size: item.size,
                  price: item.price,
                  priceNotSell: item.priceNotSell,
                  rateSell: item.rateSell,
                  countRate: item.countRate,
                },
              }}>
           <span className="info">{item.name}</span>
           </Link>
            <span className="size">{item.size}</span>
            <span className="price">{item.price}</span>
            <div className="sell-info">
              <span><s>{item.priceNotSell}</s></span>
              <span className="rate-sell">{item.rateSell}</span>
            </div>
            <div className="rating-info">
              <Image className="img-rating" src={danhgia} alt="Danh gia" />
              <span className="count-rating">{item.countRate}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-show-more">
        <button onClick={handleShowMore}>Show more</button>
      </div>
    </div>
  );
};

export default SellProducts;
