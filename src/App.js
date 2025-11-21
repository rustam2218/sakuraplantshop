import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

function App() {
  return (
    <GoogleOAuthProvider clientId="951971411963-h0bofla98l3u281lqje8vddlbch5mc7j.apps.googleusercontent.com">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
