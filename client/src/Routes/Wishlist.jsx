/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import BagItems from "../components/BagItems";
import PriceDetails from "../components/PriceDetails";
// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { loadingStatusSliceAction } from "../store/LoadingStatus";
import LoadingSpinner from "../components/LoadingSpinner";
import WishlistItems from "@/components/WishlistItems";

const Wishlist = () => {
  const { wishList } = useSelector((store) => store.wishlists);

  const loadingStatus = useSelector((store) => store.loadingStatus); // Access loading status

  return (
    <div className="bag clearfix">
      <div className="float-start">
        {loadingStatus.loading ? (
          <LoadingSpinner />
        ) : (
          wishList.products.map((item, index) => {
            return (
              <WishlistItems
                key={item.productId._id || index}
                item={item.productId}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Wishlist;
