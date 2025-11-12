'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './css/search.module.css';
import { Product } from '@/type/product';
import FilterSection from './FilterSection';
import useSWR from 'swr';
import { Category } from '@/type/category';

interface Prop {
  keyword: string;
}

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const sortOptions = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Search({ keyword }: Prop) {
  const [selectedSort, setSelectedSort] = useState('price_asc');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [discount, setDiscount] = useState(false);

  const params = new URLSearchParams();
  params.append('keyword', keyword);

  selectedSizes.forEach((size) => {
    params.append('size[]', size);
  });

  if (discount) {
    params.set('discount_percent', '1');
  }

  params.append('sort', selectedSort);
  const queryString = params.toString();

  const {
    data: products,
    error: productError,
    isLoading: productLoading,
  } = useSWR<Product[]>(
    `http://127.0.0.1:8000/api/search?${queryString}`,
    fetcher
  );

  const {
    data: categories,
    error: categoryError,
    isLoading: categoryLoading,
  } = useSWR<Category[]>('http://149.28.159.177/api/category', fetcher);

  if (productLoading) return <p>Đang tải...</p>;
  if (productError) return <p>Lỗi khi tải dữ liệu ❌</p>;
  if (!products) return <p>Không có dữ liệu.</p>;

  if (categoryLoading) return <p>Đang tải...</p>;
  if (categoryError) return <p>Lỗi khi tải dữ liệu ❌</p>;
  if (!categories) return <p>Không có dữ liệu.</p>;

  function handleSizeChange(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  return (
    <div className={styles['search-container']}>
      <div className={styles['search-header']}>
        <h2>27 Items Found for “Polo Shirt”</h2>

        <div className={styles['sort-section']}>
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles['search-layout']}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Category with search */}
          <div className={styles['category-panel']}>
            <div className={styles['category-header']}>
              <h3>Category</h3>
            </div>

            <div className={styles['category-list']}>
              {categories.map((item) => (
                <div key={item.id} className={styles['category-item']}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          {/* Other filters */}
          <FilterSection
            title="Size"
            options={sizes}
            selectedValues={selectedSizes}
            onChange={handleSizeChange}
          />

          <div className={styles['filter-section']}>
            <h3>Discount</h3>
            <label>
              <input
                type="checkbox"
                checked={discount}
                onChange={(e) => setDiscount(e.target.checked)}
              />
              Discount
            </label>
          </div>
        </aside>

        {/* Products */}
        <div className={styles['sell-product-list']}>
          {products.map((item) => (
            <div key={item.id} className={styles['sell-product-item']}>
              <Link href={`/products/${item.id}`}>
                <Image
                  src={item.image_path}
                  alt={item.name}
                  width={120}
                  height={158}
                />
              </Link>
              <Link href={`/products/${item.id}`}>
                <span className={styles.info}>{item.name}</span>
              </Link>
              <span className={styles.size}>Size: {item.size}</span>
              <span className={styles.price}>
                ${item.original_price * (1 - item.discount_percent / 100)}
              </span>
              <div className={styles['sell-info']}>
                <span>
                  <s>{item.original_price}</s>
                </span>
                <span
                  className={`${styles['rate-sell']} ${styles['ml-8']}`}
                >
                  {item.discount_percent}%
                </span>
              </div>
              <div className={styles['rating-info']}>
                <span>⭐⭐⭐⭐⭐</span>
                <span className={styles['count-rating']}>
                  {item.countRate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
