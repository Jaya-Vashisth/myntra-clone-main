import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { API_END_POINT } from "../../utils/constants.js";
import { setwishList } from "@/store/wishlistSlice.js";

const useGetWishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${API_END_POINT}/wishlist/67405a48d50a3015702ba9fa`,
          {}
        );
        if (res.data.success) console.log(res.data.wishlist);
        dispatch(setwishList(res.data.wishlist));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [dispatch]);
};

export default useGetWishlist;
