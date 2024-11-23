const express = require("express");
const router = express.Router();
const {
  getInitialItems,
  getBagItems,
  addItems,
  addToBag,
  deleteFormBag,
  updateItem,
} = require("../controllers/items");
const {
  register,
  login,
  updateProfile,
  logout,
} = require("../controllers/userController.js");

const cartController = require("../controllers/CartController.js");
const isAuthenticated = require("../middlewares/isAuthenticate.js");
const orderController = require("../controllers/orderController.js");
const wishlistController = require("../controllers/wishListController.js");

////////////////////////////// Products route/////////////////////////
router.get("/items", getInitialItems);
router.route("/items/:id").patch(updateItem);
router.get("/bag-items", getBagItems);
router.post("/add-items", addItems);
router.post("/add-to-bag", addToBag);
//delete and update from bag
router.route("/bag-items/:id").delete(deleteFormBag);

/////////////////////////////////  auth routes ////////////////////
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").put(isAuthenticated, updateProfile);
router.route("/logout").get(logout);

///////////////////  Cart routes   ////////////////////////////////////

router.route("/addcart").post(cartController.addToCart);
router
  .route("/removecart/:userId/:itemId")
  .delete(cartController.removeFromCart);
router.get("/viewcart/:userId", cartController.viewCart);
router.put("/updatecart", cartController.updateCartQuantity);
router.delete("/clearcart", cartController.clearCart);

/////////////////// wishlist route //////////////
router.post("/wishlist", wishlistController.addToWishlist);
// Remove item from wishlist
router.delete(
  "/wishlist/:userId/:itemId",
  wishlistController.removeFromWishlist
);
// Get wishlist
router.get("/wishlist/:userId", wishlistController.getWishlist);

//////////////////// orders route /////////////////////////////////////////

router.post("/createOrder", orderController.createOrder);
// Get all orders for a user
router.get("/user/:userId", orderController.getUserOrders);
// Get a single order by orderId
router.get("/:orderId", orderController.getOrderById);
// Update order status (shipped, delivered, canceled)
router.put("/update-status", orderController.updateOrderStatus);
// Cancel/delete an order
router.delete("/order/:orderId", orderController.deleteOrder);

module.exports = { router };
