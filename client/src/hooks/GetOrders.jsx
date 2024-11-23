import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { API_END_POINT } from "../../utils/constants.js";
import { setorders } from "../store/orderSlice";

const useGetorders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchorders = async () => {
      try {
        const res = await axios.get(
          `${API_END_POINT}/user/67405a48d50a3015702ba9fa`,
          {}
        );
        if (res.data.success) console.log(res.data.orders);
        dispatch(setorders(res.data.orders));
      } catch (error) {
        console.log(error);
      }
    };
    fetchorders();
  }, [dispatch]);
};

export default useGetorders;
