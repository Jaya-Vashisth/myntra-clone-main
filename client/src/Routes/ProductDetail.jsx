/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
const ProductDetail = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState(null);
  const items = useSelector((store) => store.items);
  useEffect(() => {
    const productDetails = items.find((item) => item._id === id); // Find the product based on id
    setProduct(productDetails); // Set product state
  }, [id, items]); // Dependency array ensures this runs when `id` or `items` change

  if (!product) return <div>Loading...</div>; // Show loading state
  return (
    <div className="container">
      <div className="card">
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-6">
              <div className="preview-pic tab-content">
                <div
                  style={{
                    flex: "1 1 50%",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.item_name}
                    style={{
                      maxWidth: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="details col-md-6">
              <p
                style={{
                  color: "#282c3f",
                  padding: "0 20px 0 0", // Corrected padding syntax
                  fontSize: "24px", // Use camelCase for CSS properties
                  fontWeight: "700",
                  lineHeight: "1",
                  marginBottom: "0px",
                }}
              >
                {product.company}
              </p>
              <h3
                style={{
                  color: "#535665",
                  padding: "5px 20px 14px 0", // Correct padding syntax
                  fontSize: "20px", // Use camelCase
                  opacity: "0.8", // Wrap numeric values in quotes
                  fontWeight: "400", // Use camelCase
                }}
              >
                {product.item_name}
              </h3>
              <div
                className="rating"
                style={{
                  marginTop: "20px",
                  backgroundColor: "#C0C0C0",
                  paddingLeft: "10px",
                }}
              >
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`fa fa-star ${
                        index < product.rating.stars ? "checked" : ""
                      }`}
                    >
                      <FaStar
                        className={
                          index < product.rating.stars
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    </span>
                  ))}
                </div>
                <span className="review-no">
                  {product.rating.count} reviews
                </span>
              </div>
              <p className="pdp-discount-container">
                <span className="pdp-price" tabIndex="0">
                  <strong>₹{product.current_price}</strong>
                </span>
                <span className="pdp-mrp">
                  MRP <s>₹{product.original_price}</s>
                </span>
              </p>
              <p className="pdp-selling-price">
                <span className="pdp-vatInfo">Inclusive of all taxes</span>
              </p>

              <p className="vote">
                <strong>91%</strong> of buyers enjoyed this product!
                <strong>(87 votes)</strong>
              </p>
              <div className="action">
                <button
                  className="add-to-cart btn btn-default"
                  type="button"
                  style={{ backgroundColor: "#F13AB1", color: "white" }}
                >
                  add to bag
                </button>
                <button className="like btn btn-default" type="button">
                  <span className="fa fa-heart"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
