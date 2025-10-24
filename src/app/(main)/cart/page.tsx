'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { CartItem } from "@/type/cart";
import "./css/cart.css"; 

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const handleRemove = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleQuantityChange = (index: number, change: number) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, updated[index].quantity + change);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };


  const total = cartItems.reduce((sum, item) => {
    const priceNum = Number(item.price.replace("Rs.", "")); 
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">🛍️ Giỏ hàng trống</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              {item.src && (
                <Image
                  src={item.src}
                  alt={item.name}
                  width={90}
                  height={90}
                  className="cart-img"
                />
              )}
              <div className="cart-info">
                <p className="cart-name">{item.name}. {item.size}</p>
                <p className="cart-brand">Brand: Nike</p>
                <div className="cart-price">
                  <span className="price-new">{item.price}</span>
                  {item.priceNotSell && (
                    <span className="price-old">{item.priceNotSell}</span>
                  )}
                  {item.rateSell && <span className="discount">{item.rateSell}</span>}
                </div>
              </div>
              <div className="cart-actions">
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                </div>
                <div className="cart-icons">
                  <button className="remove" onClick={() => handleRemove(index)}>🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-right">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Subtotal ({cartItems.length})</p>
          <div className="total">
            <span>Total</span>
            <span className="total-price">Rs.{total}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
