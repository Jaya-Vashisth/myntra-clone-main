const Order = require("../models/Orders"); // Import the Order model
const Item = require("../models/items"); // Import the Item model

// Create an order (Checkout)
const createOrder = async (req, res) => {
  try {
    const { userId, products, paymentMethod } = req.body;

    // Calculate total price
    let totalPrice = 0;
    const orderProducts = [];

    for (let item of products) {
      const product = await Item.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }

      const productTotal = item.quantity * product.current_price;
      orderProducts.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.current_price,
        total: productTotal,
      });
      totalPrice += productTotal;
    }

    // Create the order
    const order = new Order({
      userId,
      products: orderProducts,
      totalPrice,
      paymentMethod,
      paymentStatus: "pending", // Assuming payment is pending at checkout
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders by userId
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate("products.productId") // Populate product details in order
      .exec();

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single order by orderId
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update order status (e.g., shipped, delivered, canceled)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!["pending", "shipped", "delivered", "canceled"].includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an order (Cancel)
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // You can add more checks if necessary (like only allowing cancellation before shipping)
    await order.remove();
    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
