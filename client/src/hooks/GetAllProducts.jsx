import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { API_END_POINT } from "../../utils/constants.js";
import { setAllproducts } from "../store/productSlice";

const useGetAllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`${API_END_POINT}/items`, {});
        if (res.data.success) dispatch(setAllproducts(res.data.products));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();
  }, [dispatch]);
};

export default useGetAllProducts;
