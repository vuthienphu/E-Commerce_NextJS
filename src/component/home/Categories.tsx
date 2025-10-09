import Image from 'next/image';
import moblie from './img/shopping.webp';
import './css/categories.css';

const Categories = () => {
const categories = [
    {name:'MOBILES',image:moblie},
    {name:'MEN',image:moblie},
      {name:'CLOTHING',image:moblie},
       {name:'LAPTOPS',image:moblie},
        {name:'FAN',image:moblie},
         {name:'SPEAKERS',image:moblie},
          {name:'GARDEN',image:moblie},
          {name:'LAUNDRY',image:moblie},
          {name:'WHATCHES',image:moblie},
          {name:'SOLAR',image:moblie},
          {name:'KITCHEN',image:moblie},
          {name:'BOOKS',image:moblie},

]

return(
    <div className="categories">
        <h2>Categories</h2>
        <div className="line"></div>
        <div className="category-list">
{
    categories.map((item,index) => (
    <div key={index} className="category-item">
        <div><Image src={moblie} alt={item.name} className='image'/></div>
        <a href='#'>{item.name}</a>
        </div>
        ))
}
        
    </div>
    </div>
)
}
export default Categories;