'use client'
import { useSearchParams,useRouter } from "next/navigation";
import { useState } from "react";
import './css/buy.css'; // bạn tạo file CSS riêng cho trang này

const Buy = () => {
  const searchParams = useSearchParams();
 const router = useRouter();
  const name = searchParams.get("name") || "Unknown Product";
  const size = searchParams.get("size") || "";
  const price = searchParams.get("price") || "";
  const rateSell = searchParams.get("rateSell") || "";
  const quantity = searchParams.get("quantity") || "1";

  // Chuyển giá trị sang dạng số để tính tổng
 const priceNum = Number(price.replace("Rs.", "")); 
  const deliveryFee = 100;
  const total =priceNum*parseInt(quantity)  + deliveryFee;
 const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

   const handlePlaceOrder = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowSuccess(true);
    // Có thể thêm logic gọi API đặt hàng ở đây
  };

  const handleGoHome = () => {
    router.push("/"); // chuyển về trang chủ
  };


  return (
    <div className="buy-container">
      {/* Main content */}
      <div className="buy-content">
        {/* Cột trái */}
        <div className="left-section">
          <div className="delivery-card">
            <p><strong>Deliver to:</strong> -----------</p>
            <p className="mt-8">Address: Street no.1, Area, City, Country, ...</p>
            <p className="mt-8">Send to address: <input type="text" required = {true}/></p>
            <p className="mt-8">Phone number: <input type="tel" required = {true}/></p>
          </div>

          <div className="order-card">

            <div className="order-item">
              <img src="img/aophong.webp" alt="ao phong" width={150}/>
              <div className="item-info">
                <h2 className="item-name">{name}. {size}</h2>
              </div>
            </div>

            <div className="subtotal">Sub Total: {price}</div>
          </div>

        </div>

        {/* Cột phải */}
        <div className="right-section">
          <div className="summary-card">
            <p className="summary-title">Order Summary :</p>
            <p className="mt-8 fw">Items Total: {price}</p>
            <p className="mt-8 fw">Quantity: {quantity}</p>
            <p className="mt-8 fw">Delivery Fees: Rs.{deliveryFee}</p>
            <p className="mt-8 fw">Tax on Ite : Rs.0</p>
            <p className="mt-8 fw">Discount: {rateSell}</p>
            <hr />
            <h2 className="mt-8">Total: <span className="total">Rs.{total}</span> </h2>
            <button className="btn-place mt-8" onClick={()=>handlePlaceOrder()}>Place Order</button>
          </div>

        </div>
      </div>
      
      {/* Popup xác nhận */}
      {showConfirm && (
        <div className="overlay">
          <div className="popup">
            <h3>Confirm Order?</h3>
            <p>Do you want to place this order?</p>
            <div className="popup-buttons">
              <button onClick={handleConfirm}>Yes</button>
              <button onClick={() => setShowConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup đặt hàng thành công */}
      {showSuccess && (
        <div className="overlay">
          <div className="popup success">
            <div className="checkmark">✔</div>
            <h2>Order Placed Successfully</h2>
            <button onClick={handleGoHome}>Go to Home Page</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
