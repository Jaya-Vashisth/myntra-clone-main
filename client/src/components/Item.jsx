/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoIosHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";
import { API_END_POINT } from "../../utils/constants";
import { setCart } from "@/store/cartSlice";

import {
  addWishlist,
  isItemInWishlist,
  removeFromWishlist,
} from "@/hooks/wishlistapi";

const Item = ({ item }) => {
  const dispatch = useDispatch();

  const { wishList } = useSelector((store) => store.wishlists);

  const inWishlist = wishList && isItemInWishlist(wishList, item._id);

  const ToggleWishlist = async () => {
    console.log("togellelele");
    try {
      if (inWishlist) {
        await removeFromWishlist(
          dispatch,
          "67405a48d50a3015702ba9fa",
          item._id
        );
      } else {
        await addWishlist(dispatch, "67405a48d50a3015702ba9fa", item._id);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const addToBag = async () => {
    try {
      const res = await axios.post(`${API_END_POINT}/addcart`, {
        userId: "67405a48d50a3015702ba9fa",
        itemId: item._id,
        quantity: 1,
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log("error in removing from car");
    }
  };

  return (
    <>
      <div className="item">
        <Link to={`/product/${item._id}`} className="item-link">
          <div className="img">
            <img
              className="item-image img-fluid"
              src={item.image}
              alt=""
              style={{ width: "200px", height: "250px", objectFit: "contain" }}
            />
            <div className="rating">
              {item.rating.stars} ⭐ &nbsp;| &nbsp; {item.rating.count}
            </div>
          </div>
        </Link>
        <div className="product-brand">
          <h3 className="brand">{item.company}</h3>
          <h4 className="product">{item.item_name}</h4>
          <div className="price">
            <h4>Rs. {item.current_price}</h4>
            <h3>Rs. {item.original_price}</h3>
            <h2>( {item.discount_percentage}% OFF )</h2>
          </div>
          <IoIosHeartEmpty
            className="wishlist-bag-item"
            onClick={() => ToggleWishlist()}
            style={{
              color: inWishlist ? "red" : "black",
            }}
          />
          <BsHandbag
            className="wishlist-bag-item cursor-pointer"
            style={{
              color: item.add_to_bag ? "red" : "black",
            }}
            onClick={() => {
              addToBag();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Item;
