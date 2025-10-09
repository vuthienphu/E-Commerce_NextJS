import Image from 'next/image';
import './css/navbar.css'
import ellipse1  from './img/Ellipse 1.png';
import ellipse2  from './img/Ellipse 2.png';
import ellipse3  from './img/Ellipse 3.png';
import ellipse4  from './img/Ellipse 4.png';

const Navbar = () => {

    const navbars = [
  { name: 'Mart', icon: ellipse1 },
  { name: 'Decor', icon: ellipse2 },
  { name: 'Electronics', icon: ellipse3 },
  { name: 'Mobiles', icon: ellipse4 },
];
return(
    <div className="navbar">
               {navbars.map((item, index) => (
        <div key={index} className="nav">
          <Image src={item.icon} alt={item.name} />
          <span>{item.name}</span>
        </div>
      ))}
            </div>
)
}

export default Navbar;