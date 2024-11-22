const mongoose = require("mongoose");
const items = require("./items");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "item",
          required: [true, "Product ID is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Product quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Total price cannot be negative"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically handles `createdAt` and `updatedAt`
  }
);

cartSchema.pre("save", async function (next) {
  const cart = this;

  console.log("executed pre schema");

  if (cart.products && cart.products.length > 0) {
    const Item = mongoose.model("item");
    const productPrices = await Promise.all(
      cart.products.map(async (i) => {
        const product = await Item.findById(i.productId);
        return product ? product.current_price * i.quantity : 0;
      })
    );
    cart.totalPrice = productPrices.reduce((sum, price) => sum + price, 0);
  } else {
    cart.totalPrice = 0; // If no products in cart, total price is zero
  }

  cart.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
