const Cart = require("../models/Cart");
const Item = require("../models/items"); // Import the item model

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId: itemId, quantity }],
      });
    } else {
      const existingProductIndex = cart.products.findIndex(
        (product) => product.productId.toString() === itemId
      );

      if (existingProductIndex !== -1) {
        // If item already in cart, update quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // If item not in cart, add new item
        cart.products.push({ productId: itemId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    //remove from cart
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === itemId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    cart.products.splice(productIndex, 1); // Remove product from cart

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// View user cart
const viewCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update item quantity in cart
const updateCartQuantity = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === itemId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update product quantity
    cart.products[productIndex].quantity = quantity;

    await cart.save();
    res.status(200).json({ message: "Cart quantity updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Clear user's cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = []; // Empty the cart

    await cart.save();
    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  viewCart,
  updateCartQuantity,
  clearCart,
};
