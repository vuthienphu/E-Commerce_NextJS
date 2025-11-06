"use client";

import React, { useEffect, useState } from 'react';
import './css/categories.css';
import { Category } from '@/type/category';
import Image from 'next/image';


const Categories = () => {
const [categories, setCategories] = useState<Category[]>([]);

 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://149.28.159.177/api/category");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi tải danh mục:", error);
      } finally {
        //set
      }
    };

    fetchCategories();
  }, []);

return(
    <div className="categories">
        <h2>Categories</h2>
        <div className="line"></div>
       <div className="category-list">
{
    categories.map((item) => (
    <div key={item.id} className="category-item">
        <div><Image src={item.image_path} alt={item.name}  width={100} height={100}/></div>
        <a href='#'>{item.name}</a>
        </div>
        ))
}
        
    </div>
    </div>
)
}
export default Categories;