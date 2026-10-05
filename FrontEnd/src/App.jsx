import "./App.css";
import "leaflet/dist/leaflet.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import CollectionsPage from "./pages/CollectionsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductDetails from "./pages/ProductDetails";
import { Toaster } from "react-hot-toast";
import useUserStore from "./stores/useUserStore";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import CartPage from "./pages/CartPage";
import DasboardPage from "./pages/DasboardPage";
import clientContext from "./appContext/clientContext";
import PayementPage from "./pages/PayementPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import useProductStore from "./stores/useProductStore";
import useCartStore from "./stores/useCartStore";

function App() {
  const { user, checkAuth, checkUser } = useUserStore();

  const { adminConnected } = clientContext(); // afficher ou cache le navbar et le footer
  const { getAllProduct } = useProductStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const { getAllProductCart } = useCartStore();

  useEffect(() => {
    if (!user) return;

    getAllProductCart();
  }, [user, getAllProductCart]);

  if (checkUser)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 size={50} className="text-gray-200 animate-spin" />
        <h3>Chargement ....</h3>
      </div>
    );

  return (
    <div className="bg-bgColor min-h-screen lg:px-28 md:px-12 px-5 ">
      {!adminConnected && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={!user ? <Navigate to="/" /> : <CartPage />}
        />
        <Route
          path="/dashboard"
          element={user?.isAdmin ? <DasboardPage /> : <Navigate to="/" />}
        />
        <Route
          path="/place-order"
          element={!user ? <Navigate to="/" /> : <PayementPage />}
        />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route
          path="/my-orders"
          element={!user ? <Navigate to="/" /> : <MyOrdersPage />}
        />
      </Routes>
      {!adminConnected && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
