import Image from 'next/image';
import './css/footer.css';
import googlepayment from './img/googlepay.png';
import youtube from './img/youtube.png';

const Footer = () => {
return(
    <div className="footer">
        <div className="payment">
            <div className='text'>Payment method</div>
            <div className="btn-payment">
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>
            <a href="#"><Image src={googlepayment} alt="googlepayment" className="googlepayment"/></a>

            </div>
        </div>
        <div className="follow-us">
            <div className='text'>Follow us</div>
             <div className="mt12">
<a href="#"><Image src={youtube} alt="youtube" className="youtube"/></a>
<a href="#"><Image src={youtube} alt="youtube" className="youtube"/></a>
<a href="#"><Image src={youtube} alt="youtube" className="youtube"/></a>
<a href="#"><Image src={youtube} alt="youtube" className="youtube"/></a>
</div>
        </div>

        <div className="address">
<div className='text'>Adress</div>
<div className='mt12'>road name, area, city,country</div>
        </div>
    </div>
)
}

export default Footer;