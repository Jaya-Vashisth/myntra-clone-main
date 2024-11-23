import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../store/itemsSlice"; // Assuming you have itemsActions to update store
import { Link } from "react-router-dom";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search input
  const dispatch = useDispatch();
  const { allproducts } = useSelector((store) => store.product); // Access items from Redux store
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter items by brand (company) or item name based on search query
  const filteredItems = allproducts.filter((item) => {
    return (
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="search me-5">
      <div style={{ position: "relative" }}>
        <GoSearch
          style={{
            margin: "0px 20px 0px 10px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <input
          type="search"
          placeholder="Search for products, brands, and more"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearch} // Handle the input change
          style={{
            padding: "8px 10px",
            paddingLeft: "35px", // Space for the search icon
            border: "1px solid #ddd",
          }}
        />
        {/* Display filtered results */}
        {searchQuery && filteredItems.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 10,
              marginTop: "5px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
              {filteredItems.map((item) => (
                <Link key={item.id} to={`/product/${item._id}`}>
                  <li
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      {item.item_name}
                    </p>
                    <p style={{ margin: 0, color: "#555" }}>{item.company}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
        {/* Optional: Display 'No items found' message */}
        {searchQuery && filteredItems.length === 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 10,
              marginTop: "5px",
              padding: "8px 10px",
              color: "#555",
            }}
          >
            No items found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
