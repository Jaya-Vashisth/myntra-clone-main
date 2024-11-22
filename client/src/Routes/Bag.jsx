/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import BagItems from "../components/BagItems";
import PriceDetails from "../components/PriceDetails";
// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { loadingStatusSliceAction } from "../store/LoadingStatus";
import LoadingSpinner from "../components/LoadingSpinner";
import { bagItemsAction } from "../store/bagSlice";

const Bag = () => {
  const bagItems = useSelector((store) => store.bagItems);
  const loadingStatus = useSelector((store) => store.loadingStatus); // Access loading status
  const dispatch = useDispatch();

  let totalPrice = 0;
  let totalDiscountAmt = 0;

  bagItems.map((item) => {
    totalPrice += item.current_price;
    totalDiscountAmt += (item.discount_percentage / 100) * item.current_price;
  });

  return (
    <div className="bag clearfix">
      <div className="float-start">
        {loadingStatus.loading ? (
          <LoadingSpinner />
        ) : (
          bagItems.map((item) => {
            return <BagItems key={item._id} item={item} />;
          })
        )}
      </div>
      <PriceDetails
        totalPrice={totalPrice.toFixed(2)}
        totalDiscountAmt={totalDiscountAmt.toFixed(2)}
      />
    </div>
  );
};

export default Bag;
