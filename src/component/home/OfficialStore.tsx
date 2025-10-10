import Image from "next/image";
import './css/officialstore.css';
import maria from './img/Maria-B-Logo_1200x1200 1.png';
import ak from './img/logoak.png';
import j from './img/J 1.png';
import bata from'./img/Bata-3 1.png';
import unname from './img/unnamed 1.png';



const OfficialStore= () => {
    return(
 <div className="official-stores">
                    <h2>Official Stores</h2>
                    <div className="line"></div>
               
                <div className="logo-stores">
                   <a href="#"> <Image src={j} alt="logo J1"/></a>
                   <a href="#"> <Image src={maria} alt="logo maria"/></a>
                   <a href="#"> <Image src={unname} alt="anh logo seri"/></a>
                   <a href="#"> <Image src={bata} alt="logo bata"/></a>
                   <a href="#"> <Image src={ak} alt="anh logo ak"/></a>
                </div>
                 </div>
)
}
export default OfficialStore;