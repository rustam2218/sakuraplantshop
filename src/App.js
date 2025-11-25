import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="951971411963-h0bofla98l3u281lqje8vddlbch5mc7j.apps.googleusercontent.com">
      {/* Добавляем basename для корректной работы на GitHub Pages */}
      <Router basename="/sakuraplantshop">
        <div className="App">
          <Header />
          <main>
            <Routes>
              {/* Главная страница */}
              <Route path="/" element={<Home />} />
              {/* Каталог */}
              <Route path="/catalog" element={<Catalog />} />
              {/* Профиль */}
              <Route path="/profile" element={<Profile />} />
              {/* Корзина */}
              <Route path="/cart" element={<Cart />} />
              {/* Если путь не найден, редиректим на Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
