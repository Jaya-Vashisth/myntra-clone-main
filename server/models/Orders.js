const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
        price: {
          type: Number,
          required: [true, "Product price is required"],
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Total price cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    // shippingAddress: {
    //   type: String,
    //   required: [true, "Shipping address is required"],
    // },

    paymentMethod: {
      type: String,
      enum: ["cash", "credit_card", "paypal"],
      required: [true, "Payment method is required"],
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

// Middleware to calculate total price before saving the order
orderSchema.pre("save", async function (next) {
  const order = this;

  if (order.products && order.products.length > 0) {
    const productTotal = order.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    order.totalPrice = productTotal;
  } else {
    order.totalPrice = 0; // If no products in the order, total price is zero
  }

  order.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
