import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./Routes/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Bag from "./Routes/Bag.jsx";
import Home from "./Routes/Home.jsx";
import Men from "./Routes/Men.jsx";
import Women from "./Routes/Women.jsx";
import Kids from "./Routes/Kids.jsx";
import { Provider } from "react-redux";
import myntraStore from "./store/index.js";
import BagItems from "./components/BagItems.jsx";
import ProductDetail from "./Routes/ProductDetail.jsx";
import Login from "./components/auth/Login.jsx";
import Wishlist from "./Routes/Wishlist.jsx";
// import Signup from "./components/auth/Signup.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      {
        path: "/signup",
        // element: <Signup />,
      },
      { path: "/bag", element: <Bag /> },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      { path: "/men", element: <Men /> },
      { path: "/women", element: <Women /> },
      { path: "/kids", element: <Kids /> },
      { path: "/price", element: <BagItems /> },
      { path: "/product/:id", element: <ProductDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
