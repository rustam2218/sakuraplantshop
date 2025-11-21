import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./Catalog.css";

const initialProducts = [
  { id: 1, name: "Растение 1", price: 5000, description: "Красивое комнатное растение для вашего дома.", img: process.env.PUBLIC_URL + "/img/Без названия (1).jpg" },
  { id: 2, name: "Замия Замеллиния Три", price: 13000, description: "Неприхотливое комнатное растение с плотными зелёными листьями.", img: process.env.PUBLIC_URL + "/img/Без названия (2).jpg" },
  { id: 3, name: "Ципрофорум Катальпа", price: 20000, description: "Компактное ципрофорум растение с ароматными листьями.", img: process.env.PUBLIC_URL + "/img/Без названия (3).jpg" },
  { id: 4, name: "Банан Джерси", price: 10000, description: "Экзотическое растение с крупными листьями.", img: process.env.PUBLIC_URL + "/img/Без названия (4).jpg" },
  { id: 5, name: "Астильба Маджикал", price: 4000, description: "Декоративное растение с яркими соцветиями.", img: process.env.PUBLIC_URL + "/img/Без названия (5).jpg" },
  { id: 6, name: "Талландсия атмосферная Горден", price: 9000, description: "Необычное растение с розовой верхушкой.", img: process.env.PUBLIC_URL + "/img/Без названия (6).jpg" },
  { id: 7, name: "Пуансеттия", price: 1500, description: "Яркое растение с красными листьями.", img: process.env.PUBLIC_URL + "/img/Без названия (7).jpg" },
  { id: 8, name: "Орхидея Эфирос (обычная)", price: 6000, description: "Изящная цветущая орхидея.", img: process.env.PUBLIC_URL + "/img/Без названия (8).jpg" },
  { id: 9, name: "Шиффлера", price: 30000, description: "Элегантное комнатное растение с блестящими листьями.", img: process.env.PUBLIC_URL + "/img/Без названия (9).jpg" },
  { id: 10, name: "Виктория б. ступенчатая", price: 12000, description: "Водное растение с декоративными листьями.", img: process.env.PUBLIC_URL + "/img/Без названия (10).jpg" },
  { id: 11, name: "Зейхемис Мика Дока", price: 6000, description: "Эффектное декоративное растение с плотными листьями.", img: process.env.PUBLIC_URL + "/img/Без названия (11).jpg" },
  { id: 12, name: "Пальма Арека", price: 40000, description: "Тропическая пальма с длинными перистыми листьями.", img: process.env.PUBLIC_URL + "/img/Без названия (2).jpg" }
];

export default function Catalog() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPlant, setNewPlant] = useState({ name: "", price: "", description: "", img: null });

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const navigate = useNavigate();
  const adminEmails = ["rustam.n1822@gmail.com"]; // сюда твой email

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser && adminEmails.includes(currentUser.email));
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert(`${product.name} добавлено в корзину!`);
  };

  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));

  const editProduct = (id) => {
    const newName = prompt("Введите новое название", products.find(p => p.id === id)?.name);
    const newPrice = parseFloat(prompt("Введите новую цену", products.find(p => p.id === id)?.price));
    const newDescription = prompt("Введите новое описание", products.find(p => p.id === id)?.description);

    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, name: newName || p.name, price: newPrice || p.price, description: newDescription || p.description }
          : p
      )
    );
  };

  const addPlant = () => {
    if (!newPlant.name || !newPlant.price || !newPlant.description) {
      alert("Заполните все поля!");
      return;
    }
    const newItem = {
      id: Date.now(),
      name: newPlant.name,
      price: parseFloat(newPlant.price),
      description: newPlant.description,
      img: newPlant.img ? URL.createObjectURL(newPlant.img) : null
    };
    setProducts([...products, newItem]);
    setShowModal(false);
    setNewPlant({ name: "", price: "", description: "", img: null });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalog-wrapper">
      <h1>Каталог растений</h1>

      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <button className="cart-button" onClick={() => navigate("/cart")}>
        Корзина ({cart.length})
      </button>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">{product.price.toLocaleString()} ₽</p>

            {/* Кнопка для всех */}
            <button onClick={() => addToCart(product)} className="add-button">В корзину</button>

            {/* Кнопки только для админа */}
            {!loadingUser && isAdmin && (
              <>
                <button onClick={() => editProduct(product.id)} className="edit-button">Редактировать</button>
                <button onClick={() => deleteProduct(product.id)} className="delete-button">Удалить</button>
              </>
            )}
          </div>
        ))}

        {/* Карточка для добавления нового растения (только админ) */}
        {!loadingUser && isAdmin && (
          <div className="product-card add-card" onClick={() => setShowModal(true)}>
            <span className="plus">+</span>
            <p>Добавить растение</p>
          </div>
        )}
      </div>

      {/* Модальное окно добавления нового растения */}
      {!loadingUser && isAdmin && showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Добавить новое растение</h2>

            <label>Название растения:</label>
            <input type="text" value={newPlant.name} onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })} />

            <label>Цена:</label>
            <input type="number" value={newPlant.price} onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })} />

            <label>Описание:</label>
            <textarea value={newPlant.description} onChange={(e) => setNewPlant({ ...newPlant, description: e.target.value })} />

            <label>Фото:</label>
            <input type="file" onChange={(e) => setNewPlant({ ...newPlant, img: e.target.files[0] })} />

            <div className="modal-buttons">
              <button onClick={addPlant} className="save-button">Добавить</button>
              <button onClick={() => setShowModal(false)} className="cancel-button">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
