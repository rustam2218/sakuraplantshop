import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Home.css";

const adminEmails = ["sakura.khujand@gmail.com", "rustam.n1822@gmail.com"];

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      setUser(loggedUser);

      if (adminEmails.includes(loggedUser.email)) {
        alert(`Добро пожаловать, администратор ${loggedUser.displayName}!`);
      }

      navigate("/catalog");
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
      alert("Не удалось войти через Google.");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {/* НАВБАР */}
      <header className="navbar">
        <div className="icons">
          <Link to="/catalog">
            <img src={process.env.PUBLIC_URL + "/images/search1.svg"} alt="Поиск" />
          </Link>
          {/* <Link to="/cart">
            <img src={process.env.PUBLIC_URL + "/images/shopping-cart1.svg"} alt="Корзина" />
          </Link> */}
        </div>

        {!user && (
          <button className="google-btn" onClick={loginWithGoogle}>
            <img src={process.env.PUBLIC_URL + "/images/Безназвания111.jpg"} alt="Google" />
            Войти через Google
          </button>
        )}

        {user && (
          <div className="user-info">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Avatar"
                style={{ width: "35px", borderRadius: "50%", marginRight: "10px" }}
              />
            )}
            <span>Здравствуйте, {user.displayName}!</span>
            <button onClick={logout} className="logout-btn">
              Выйти
            </button>
          </div>
        )}
      </header>

      {/* ГЛАВНЫЙ БЛОК */}
      <main className="container">
        <div className="plantphoto">
          <img src={process.env.PUBLIC_URL + "/images/MaskGroup.svg"} alt="Plant" />
        </div>
        <div className="text">
          <h1>
            Добро пожаловать в интернет магазин комнатных растений
            <br />
            SAKURA.KHUJAND
          </h1>
          <p>
            Sakura — интернет-магазин комнатных растений. Мы помогаем создавать уют
            и гармонию в доме с помощью живых растений.
            <br />
            У нас вы найдёте: 🌿 Красивые и неприхотливые растения, 🌸 Цветущие
            растения, 🌱 Стильные кашпо и аксессуары, 💧 Советы по уходу.
            <br />
            Мы верим, что каждое растение приносит в дом тепло, свежесть и вдохновение.
          </p>
        </div>
      </main>

      {/* ФИЧИ */}
      <section className="features">
        <div className="feature-box">
          <img src={process.env.PUBLIC_URL + "/images/fast1.svg"} alt="Fast Delivery" />
          <div className="feature-title">Быстрая доставка</div>
          <div className="feature-text">С Sakura вы получаете радость без ожидания</div>
        </div>

        <div className="feature-box">
          <img src={process.env.PUBLIC_URL + "/images/headphones1.svg"} alt="Support" />
          <div className="feature-title">Консультация от профессионалов</div>
          <div className="feature-text">Поддержка от команды, которая знает о зелени всё</div>
        </div>

        <div className="feature-box">
          <img src={process.env.PUBLIC_URL + "/images/plant1.svg"} alt="Original Plants" />
          <div className="feature-title">Оригинальные растения</div>
          <div className="feature-text">Живое искусство, которое не требует слов</div>
        </div>

        <div className="feature-box">
          <img src={process.env.PUBLIC_URL + "/images/dollar-symbol1.svg"} alt="Affordable Price" />
          <div className="feature-title">Приемлемые цены</div>
          <div className="feature-text">Уют не должен быть дорогим</div>
        </div>
      </section>

      {/* ПУСТОЙ СПИСОК ТОВАРОВ */}
      <section>
        <div className="products">
          {[].map((img, index) => (
            <div className="product-card" key={index}>
              <Link to="/catalog">
                <img src={process.env.PUBLIC_URL + "/images/plant-in-hand.svg"} alt={`Plant ${index + 1}`} />
                <div className="product-name">Растение {index + 1}</div>
                <div className="product-price">{85 + index * 10} TJS</div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* БАННЕР МАГАЗИНА */}
      <section className="shop-banner">
        <div className="shop-text">
          <h1>
            Приобретите ваши любимые растения в нашем магазине <br />
            прямо сейчас!
          </h1>
          <Link to="/catalog" className="btn">
            посетить магазин
          </Link>
        </div>
        <div className="shop-image">
          <img src={process.env.PUBLIC_URL + "/images/plant-in-hand.svg"} alt="Plant in hand" />
        </div>
      </section>

      {/* ФУТЕР */}
      {/* <footer className="footer">
        <div className="footer-column">
          <span className="logo">Sakura Khujand</span>
          <p>
            Наши контакты
            <br />
            +992-92-838-23-33
            <br />
            sakura.khujand@gmail.com
          </p>
        </div>

        <div className="footer-column">
          <h4>Мы в социальных сетях</h4>
          <p>
            <a
              href="https://www.instagram.com/sakura_khujand"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram: sakura_khujand
            </a>
          </p>
          <p>
            <a href="https://t.me/sakurakhujand" target="_blank" rel="noopener noreferrer">
              Telegram: Sakura Khujand
            </a>
          </p>
          <p>
            Whatsapp: 928382333
          </p>
        </div>

        <div className="footer-column">
          <h4>Продукт</h4>
          <p><Link to="/catalog">Растение</Link></p>
          <p><Link to="/catalog">Другие растения</Link></p>
        </div>

        <div className="footer-column">
          <h4>Подпишитесь на рассылку</h4>
          <input
            type="email"
            className="subscribe-input"
            placeholder="Введите адрес электронной почты"
          />
        </div>
      </footer> */}
    </div>
  );
}
