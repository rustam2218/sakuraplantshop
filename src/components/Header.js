import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header(){
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">🌿 SAKURA KHUJAND</Link>
        </div>
        <nav className="nav-links">
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/profile">Профиль</Link>
          <Link to="/cart" className="cart-link">🛒 Корзина</Link>
        </nav>
      </div>
    </header>
  );
}
export default Header;
