import React, { useState, useEffect } from "react";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Загружаем корзину из localStorage при монтировании
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  // Пересчёт общей суммы при изменении корзины
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Очистка корзины
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="cart-wrapper">
      <header>
        <h1>Ваша корзина</h1>
      </header>

      <section className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.price.toLocaleString()} ₽</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="total">
            Общая сумма: <span>{totalPrice.toLocaleString()} ₽</span>
          </div>
          <button className="clear-cart" onClick={clearCart}>
            Очистить корзину
          </button>
        </div>
      </section>
    </div>
  );
}
