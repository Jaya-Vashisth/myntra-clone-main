const Item = require("../models/items");
const Bag_Item = require("../models/bagItems");

///add product
const addItems = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    console.log("error occured : /n", error);
  }
};

//add to cart
const addToBag = async (req, res) => {
  try {
    // console.log(req.body)
    const bagItem = await Bag_Item.create(req.body);
    res.status(201).json(bagItem);
  } catch (error) {
    console.log("error occured : /n", error);
  }
};

//all items
const getInitialItems = async (req, res) => {
  try {
    const products = await Item.find({});
    return res.status(200).json({
      success: true,
      message: "items fetched successfully",
      products,
    });
  } catch (error) {
    console.log("error occured : /n", error);
  }
};

//items in cart
const getBagItems = async (req, res) => {
  try {
    const bagItems = await Bag_Item.find({});
    return res.status(200).json(bagItems);
  } catch (error) {
    console.log("error occured : /n", error);
  }
};

//remove from cart
const deleteFormBag = async (req, res) => {
  try {
    // console.log(req.params)
    const deletedBagItem = await Bag_Item.findOneAndDelete({
      _id: req.params.id,
    });
    return res.status(200).json(deletedBagItem);
  } catch (error) {
    console.log("error occured : /n", error);
  }
};

//update item
const updateItem = async (req, res) => {
  try {
    // console.log(req.params)
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedItem);
  } catch (error) {
    console.log("error occured : /n", error);
  }
};

module.exports = {
  getInitialItems,
  getBagItems,
  addItems,
  addToBag,
  deleteFormBag,
  updateItem,
};
