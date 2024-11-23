import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { API_END_POINT } from "../../utils/constants.js";
import { setCart } from "../store/cartSlice";

const useGetCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${API_END_POINT}/viewcart/67405a48d50a3015702ba9fa`,
          {}
        );
        if (res.data.success) console.log(res.data.cart);
        dispatch(setCart(res.data.cart));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [dispatch]);
};

export default useGetCart;
