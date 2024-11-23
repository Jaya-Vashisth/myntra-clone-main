/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import BagItems from "../components/BagItems";
import PriceDetails from "../components/PriceDetails";
// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { loadingStatusSliceAction } from "../store/LoadingStatus";
import LoadingSpinner from "../components/LoadingSpinner";

const Bag = () => {
  const { Cart } = useSelector((store) => store.cart);

  const loadingStatus = useSelector((store) => store.loadingStatus); // Access loading status

  let totalPrice = 0;
  let totalDiscountAmt = 0;

  Cart.products.map((item) => {
    totalPrice += item.productId.current_price;
    totalDiscountAmt +=
      (item.productId.discount_percentage / 100) * item.productId.current_price;
  });

  return (
    <div className="bag clearfix">
      <div className="float-start">
        {loadingStatus.loading ? (
          <LoadingSpinner />
        ) : (
          Cart.products.map((item) => {
            return (
              <BagItems
                key={item.productId._id}
                item={item.productId}
                quantity={item.quantity}
              />
            );
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
