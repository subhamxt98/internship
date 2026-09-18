import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import OrderSuccessPage from "./pages/OrderSuccessPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
//dsd//