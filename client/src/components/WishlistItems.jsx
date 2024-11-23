/* eslint-disable react/prop-types */
import { PiKeyReturn } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setwishList } from "@/store/wishlistSlice.js";
import axios from "axios";
import { API_END_POINT } from "../../utils/constants";
import { useState } from "react";
import { removeFromWishlist } from "@/hooks/wishlistapi";

const WishlistItems = ({ item }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  if (loading) return <div>loading....</div>;
  else
    return (
      <div className="card p-3 m-3 me-1">
        <div className="clearfix itemcard">
          <div className="float-start clearfix">
            <div className="bagItemImg float-start">
              <img
                className="img-fluid"
                src={item.image}
                alt={item.item_name || "Item image"}
              />{" "}
            </div>
            <div className="float-end ms-3 bagItemDetails">
              <h5
                style={{
                  marginBottom: "0px",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {item.company}
              </h5>
              <p
                style={{
                  marginBottom: "0px",
                  fontSize: "15px",
                  fontWeight: "300",
                }}
              >
                {item.item_name}
              </p>
              <p
                style={{
                  marginBottom: "8px",
                  fontSize: "12px",
                  fontWeight: "200",
                  color: "#a1a1a1",
                }}
              >
                Sold by: {item.sold_by}
              </p>

              <div style={{ display: "flex" }}>
                <div
                  className="me-2 bg-body-secondary"
                  style={{ padding: "2px", borderRadius: "2px" }}
                >
                  Size: {item.size} <IoMdArrowDropdown />
                </div>
                {/* <div
                  className="bg-body-secondary"
                  style={{ padding: "2px", borderRadius: "2px" }}
                >
                  Qty: {quantity} <IoMdArrowDropdown />
                </div> */}
              </div>

              <div className="price">
                <h4>Rs. {item.current_price}</h4>
                <h3>Rs. {item.original_price}</h3>
                <h2>( {item.discount_percentage}% OFF )</h2>
              </div>

              <div style={{ display: "flex", margin: "0px" }}>
                <PiKeyReturn className="fs-5" />
                {item.return_period} days &nbsp;
                <p
                  style={{
                    color: "rgb(125 121 121)",
                    fontWeight: "300",
                    margin: "0px",
                  }}
                >
                  return available
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-close float-end"
            aria-label="Close"
            onClick={() => removeFromWishlist(dispatch, "", item._id)}
          ></button>
        </div>
      </div>
    );
};

export default WishlistItems;
