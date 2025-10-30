'use client';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import styles from './css/sellproducts.module.css';
import Link from 'next/link';
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
    // mỗi lần bấm hiện thêm 6 sản phẩm
    setShowCount((prev) => prev + 6);
  };

  return (
    <div className={styles['sell-products']}>
      <h2>Best Selling Products</h2>
      <div className={styles.line}></div>

      <div className={styles['sell-product-list']}>
        {visibleProducts.map((item) => (
          <div key={item.id} className={styles['sell-product-item']}>
            <div className={styles['img-wrapper']}>
              <Link href={`/products/${item.id}`}>
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Link>
            </div>

            <Link href={`/products/${item.id}`}>
              <span className={styles.info}>{item.name}</span>
            </Link>

            <div>
              <span className={styles.size}>Size: {item.size}</span>
            </div>

            <span
              className={styles.price}
              style={{ fontSize: '20px', color: 'red' }}
            >
              ${item.original_price - (item.original_price * item.discount_percent) / 100}
            </span>

            <div className={styles['sell-info']}>
              <span>
                <s>{item.original_price}</s>
              </span>
              <span className={`${styles['rate-sell']} ${styles['ml-8']}`}>
                {item.discount_percent}%
              </span>
            </div>

            <div className={styles['rating-info']}>
              <span>⭐⭐⭐⭐⭐</span>
              <span className={styles['count-rating']}>{item.countRate}</span>
            </div>
          </div>
        ))}
      </div>

      {visibleProducts.length < data.length && (
        <div className={styles['btn-show-more']}>
          <button onClick={handleShowMore}>Show more</button>
        </div>
      )}
    </div>
  );
};

export default SellProducts;
