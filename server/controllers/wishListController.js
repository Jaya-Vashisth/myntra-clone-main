const Wishlist = require("../models/wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    const alreadyInWishlist = wishlist.products.some(
      (product) => product.productId._id.toString() === itemId
    );

    if (alreadyInWishlist) {
      return res.status(400).json({
        successs: true,
        message: "Item is already in wishlist",
        wishlist,
      });
    }

    wishlist.products.push({ productId: itemId });
    await wishlist.save();

    res
      .status(200)
      .json({ successs: true, message: "Item added to wishlist", wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to remove an item from the wishlist
const removeFromWishlist = async (req, res) => {
  try {
    // Find the wishlist for the given user
    const { userId, itemId } = req.body;
    console.log(userId);
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    // Filter out the product by matching the inner productId._id
    const updatedProducts = wishlist.products.filter(
      (item) => item.productId._id.toString() !== itemId
    );

    // Update the wishlist with the filtered products
    wishlist.products = updatedProducts;
    const updatedWishlist = await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId: userId }).populate(
      "products.productId"
    );

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};
