'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './css/search.css';

type Category = {
  id: string
  name: string
  count?: number
  children?: Category[]
}

const categoriesData: Category[] = [
  { id: 'c1', name: 'Men shirts', count: 124 },
  { id: 'c2', name: 'White shirt', count: 32 },
  { id: 'c3', name: 'local selling product', count: 76 },
  { id: 'c4', name: 'slocal selling product', count: 5 },
  { id: 'c5', name: 'slocal selling products', count: 8 },
  { id: 'c6', name: 'local selling products', count: 18 },
  { id: 'c7', name: 'local selling products', count: 42 },
  { id: 'c8', name: 'local selling products', count: 9 },
  { id: 'c9', name: 'local selling products', count: 13 },
  { id: 'c10', name: 'local selling products', count: 2 },
  // ví dụ subcategories
  {
    id: 'c11',
    name: 'Shirts by Style',
    children: [
      { id: 'c11-1', name: 'Casual shirts', count: 21 },
      { id: 'c11-2', name: 'Formal shirts', count: 14 },
    ],
  },
]

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

const brands = ['Nike', 'xWear', 'Adidas', 'H&M']
const locations = ['Pakistan', 'China', 'Vietnam']
const sizes = ['Large', 'Medium', 'Small']

const sortOptions = [
  { value: 'best-match', label: 'Best Match' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'discount', label: 'Biggest Discount' },
]

export default function SearchPage() {
  const [selectedSort, setSelectedSort] = useState('best-match')
  const [categoryQuery, setCategoryQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
   const [displayedProducts, setDisplayedProducts] = useState(products);

  // filter categories theo search input
  const filteredCategories = categoriesData.filter((c) =>
    c.name.toLowerCase().includes(categoryQuery.toLowerCase())
  )

  function toggleExpand(id: string) {
    setExpandedCategory((prev) => (prev === id ? null : id))
  }

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>27 Items Found for “Polo Shirt”</h2>

        <div className="sort-section">
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

      <div className="search-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          {/* Category with search */}
          <div className="category-panel">
            <div className="category-header">
              <h3>Category</h3>
              <div className="category-search-wrap">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={categoryQuery}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                  className="category-search"
                />
              </div>
            </div>

            <div className="category-list">
              {filteredCategories.map((cat) => (
                <div key={cat.id} className="category-item-wrap">
                  <button
                    className={`category-item ${
                      selectedCategory === cat.id ? 'active' : ''
                    }`}
                    onClick={() =>
                      setSelectedCategory((prev) => (prev === cat.id ? null : cat.id))
                    }
                  >
                    <span className="category-name">{cat.name}</span>
                    <span className="category-count">
                      {cat.count ?? (cat.children ? cat.children.length : 0)}
                    </span>
                  </button>

                  {cat.children && cat.children.length > 0 && (
                    <>
                      <button
                        className="category-expand"
                        aria-label="expand"
                        onClick={() => toggleExpand(cat.id)}
                      >
                        {expandedCategory === cat.id ? '−' : '+'}
                      </button>

                      <div
                        className={`category-children ${
                          expandedCategory === cat.id ? 'open' : ''
                        }`}
                      >
                        {cat.children.map((sub) => (
                          <label
                            key={sub.id}
                            className={`category-sub-item ${
                              selectedCategory === sub.id ? 'active' : ''
                            }`}
                          >
                            <input
                              type="radio"
                              name="subcategory"
                              onChange={() => setSelectedCategory(sub.id)}
                              checked={selectedCategory === sub.id}
                            />
                            <span className="sub-name">{sub.name}</span>
                            <span className="sub-count">{sub.count ?? 0}</span>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Other filters */}
          <FilterSection title="Brands" options={brands} />
          <FilterSection title="Location" options={locations} />
          <FilterSection title="Size" options={sizes} />
        </aside>

        {/* Products */}
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
              <Image className="img-shirt"  src="/img/aophong.webp" alt="Áo phông"  width={120} height={158}/>
            </Link>
           <Link href={{
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
              <Image className="img-rating"  src="/img/—Pngtree—5 star rating icon reviews_12584719.jpg" alt="Danh gia"  width={68} height={16}/>
              <span className="count-rating">{item.countRate}</span>
            </div>
          </div>
        ))}
      </div>

      </div>
    </div>
  )
}

function FilterSection({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="filter-section">
      <h3>{title}</h3>
      <ul>
        {options.map((opt, i) => (
          <li key={i}>
            <input type="checkbox" id={`${title}-${opt}`} />
            <label htmlFor={`${title}-${opt}`}>{opt}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
