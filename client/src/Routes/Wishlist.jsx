/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import WishlistItems from "@/components/WishlistItems";

const Wishlist = () => {
  const { wishList } = useSelector((store) => store.wishlists);

  const { loading } = useSelector((store) => store.loadingStatus); // Access loading status

  return (
    <div className="bag clearfix">
      <div className="float-start">
        {loading ? (
          <LoadingSpinner />
        ) : (
          wishList?.products?.map((item, index) => {
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
