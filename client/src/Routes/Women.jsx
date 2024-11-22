import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Item from "../components/Item";
import LoadingSpinner from "../components/LoadingSpinner";

const Men = () => {
  const items = useSelector((store) => store.items);
  const loadingStatus = useSelector((store) => store.loadingStatus);
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 0]); // [min, max]

  const menItems = items.filter((item) => item.category === "Women");

  const maxPrice = menItems.reduce(
    (max, item) => Math.max(max, item.current_price),
    0
  );
  useEffect(() => {
    if (menItems.length > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, []);

  const filteredMenItems = menItems.filter(
    (item) =>
      item.current_price >= priceRange[0] && item.current_price <= priceRange[1]
  );

  const sortedMenItems = [...filteredMenItems].sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return a.current_price - b.current_price;
      case "priceDesc":
        return b.current_price - a.current_price;
      case "ratingAsc":
        return a.rating.stars - b.rating.stars;
      case "ratingDesc":
        return b.rating.stars - a.rating.stars;
      default:
        return 0;
    }
  });

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          marginLeft: "190px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", marginRight: "20px" }}>
          Women's Collection
        </h2>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
          style={{
            padding: "10px 15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "white",
            cursor: "pointer",
            fontSize: "16px",
            marginRight: "20px",
          }}
        >
          <option value="default">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="ratingAsc">Rating: Low to High</option>
          <option value="ratingDesc">Rating: High to Low</option>
        </select>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px", fontSize: "16px" }}>
            Price:
          </label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]} // Bind the slider to the upper limit
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            } // Update only the upper limit
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          <span style={{ fontSize: "16px" }}>Up to ₹{priceRange[1]}</span>
        </div>
      </div>
      <main className="items">
        {loadingStatus.loading ? (
          <LoadingSpinner />
        ) : sortedMenItems.length === 0 ? (
          <p>No items available.</p>
        ) : (
          sortedMenItems.map((item) => <Item key={item._id} item={item} />)
        )}
      </main>
    </div>
  );
};

export default Men;
