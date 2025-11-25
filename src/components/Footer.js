import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer(){
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>О магазине</h4>
          <p>🌿 SAKURA KHUJAND — интернет-магазин комнатных растений. Создаём уют в вашем доме с помощью живых растений.</p>
        </div>

        <div className="footer-column">
          <h4>Меню</h4>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/cart">Корзина</Link></li>
            <li><Link to="/profile">Профиль</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Контакты</h4>
          <p>📞 +992-92-838-23-33</p>
          <p>📧 sakura.khujand@gmail.com</p>
          <p>
            <a href="https://www.instagram.com/sakura_khujand" target="_blank" rel="noopener noreferrer">
              📱 Instagram
            </a>
          </p>
          <p>
            <a href="https://t.me/sakurakhujand" target="_blank" rel="noopener noreferrer">
              📲 Telegram
            </a>
          </p>
        </div>

        <div className="footer-column">
          <h4>Рассылка новостей</h4>
          <input 
            type="email" 
            className="subscribe-input" 
            placeholder="Ваша почта..." 
          />
          <button className="subscribe-btn">Подписаться</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SAKURA KHUJAND. Все права защищены.</p>
      </div>
    </footer>
  );
}
export default Footer;
