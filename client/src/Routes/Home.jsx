import Item from "../components/Item";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { allproducts } = useSelector((store) => store.product); // Access items from Redux store
  const loadingStatus = useSelector((store) => store.loadingStatus); // Access loading status

  // Group items by category
  const groupedItems = allproducts.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <main className="items">
      {loadingStatus.loading ? (
        <LoadingSpinner /> // Show spinner if loading
      ) : allproducts.length === 0 ? (
        <p>No items available.</p> // Show message if no items are available
      ) : (
        Object.keys(groupedItems).map((category) => (
          <section key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="category-items">
              {groupedItems[category].map((item) => (
                <Item key={item._id} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
};

export default Home;
