'use client'
import Image from 'next/image';
import { useState,useEffect } from 'react';
import './css/hero.css'
import iphone15 from './img/Iphone15.webp';
import shopping from './img/shopping.webp';
import aophong from './img/aophong.webp';

const Hero = ()=>{

  const slides = [iphone15, shopping, aophong];
  const [slideIndex, setSlideIndex] = useState(0);

  // Tự động đổi ảnh sau mỗi 3 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [slideIndex, slides.length]);

return(
     <div className="hero">
                <div className="content">
                    <div className="text">
                        Up to 10% OFF
                    </div>
                    <Image
            src={slides[slideIndex]}
            alt={`Slide ${slideIndex + 1}`}
            className="img fade"
          />
                   
                </div>
            </div>
)
}
export default Hero;