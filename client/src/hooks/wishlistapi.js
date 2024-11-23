import axios from "axios";
import { API_END_POINT } from "../../utils/constants";
import { setwishList } from "@/store/wishlistSlice"; // Import Redux actions

/**
 * Fetch the wishlist from the backend and set it in the Redux store.
 */
export const fetchWishlist = async (dispatch, userId) => {
  try {
    const res = await axios.get(`${API_END_POINT}/wishlist/${userId}`);
    if (res.data.success) {
      dispatch(setwishList(res.data.wishlist));
      return res.data.wishlist;
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

export const addWishlist = async (dispatch, userId, itemId) => {
  try {
    const res = await axios.post(`${API_END_POINT}/wishlist`, {
      userId,
      itemId,
    });
    if (res.data.success) {
      dispatch(setwishList(res.data.wishlist));
      return res.data.wishlist;
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

export const isItemInWishlist = (wishList, itemId) => {
  if (!wishList) return false;
  return wishList.products.some((product) => product.productId._id === itemId);
};

export const removeFromWishlist = async (dispatch, userId, itemId) => {
  try {
    const res = await axios.delete(`${API_END_POINT}/wishlist`, {
      userId,
      itemId,
    });

    if (res.data.success) {
      dispatch(setwishList(res.data.wishList));
      console.log("removed");
    }
  } catch (error) {
    console.log(error);
  }
};
