'use client';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import './css/sellproducts.css';
import { Product } from '@/type/product';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SellProducts = () => {
  const { data, error, isLoading } = useSWR<Product[]>(
    'http://127.0.0.1:8000/api/products',
    fetcher
  );


  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [showCount, setShowCount] = useState<number>(6); // ban đầu hiển thị 6 sản phẩm

  // khi data thay đổi (fetch xong) thì cập nhật visibleProducts
  useEffect(() => {
    if (data) {
      setVisibleProducts(data.slice(0, showCount));
    }
  }, [data, showCount]);

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu ❌</p>;
  if (!data) return <p>Không có dữ liệu.</p>;

  const handleShowMore = () => {
    // mỗi lần bấm hiện thêm 4 sản phẩm
    setShowCount((prev) => prev + 6);
  };

  

  return (
    <div className="sell-products">
      <h2>Best Selling Products</h2>
      <div className="line"></div>

      <div className="sell-product-list">
        {visibleProducts.map((item) => (
          <div key={item.id} className="sell-product-item">
<Link href={`/products/${item.id}`}>
            <Image className="img" src={item.image_url} alt={item.name}  width={300} height={300} />
            </Link>
        <Link href={`/products/${item.id}`}>   
        <span className="info">{item.name}</span>
        </Link> 
            <span className="size">Size: {item.size}</span>
            <span className="price">
              ${item.original_price - (item.original_price * item.discount_percent) / 100}
            </span>
            <div className="sell-info">
              <span>
                <s>{item.original_price}</s>
              </span>
              <span className="rate-sell ml-8">{item.discount_percent}%</span>
            </div>
            <div className="rating-info">
             <span>⭐⭐⭐⭐⭐</span>
              <span className="count-rating">{item.countRate}</span>
            </div>
          </div>
        ))}
      </div>

      {visibleProducts.length < data.length && (
        <div className="btn-show-more">
          <button onClick={handleShowMore}>Show more</button>
        </div>
      )}
    </div>
  );
};

export default SellProducts;
