import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import useGetAllProducts from "../hooks/GetAllProducts";
import useGetCart from "@/hooks/GetCart";
import useGetorders from "@/hooks/GetOrders";
import useGetWishlist from "@/hooks/getWishlist";

function App() {
  const [initialized, setInitialized] = useState(false); // State to track initialization

  useGetAllProducts();
  useGetCart();
  useGetorders();
  useGetWishlist();

  useState(() => {
    setInitialized(true);
  }, []);

  // Show a loading spinner until initialization is complete
  if (!initialized) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
