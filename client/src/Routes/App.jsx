import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { loadingStatusSliceAction } from "../store/LoadingStatus";
import LoadingSpinner from "../components/LoadingSpinner";

function App() {
  const [initialized, setInitialized] = useState(false); // State to track initialization
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadingStatusSliceAction.startloading());
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/items`
        );
        const items = await response.json();
        dispatch(itemsActions.addInitialItems(items));
        setInitialized(true); // Mark as initialized after fetching data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(loadingStatusSliceAction.stoploading());
      }
    };

    fetchData();
  }, [dispatch]);

  // Show a loading spinner until initialization is complete
  if (!initialized) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
