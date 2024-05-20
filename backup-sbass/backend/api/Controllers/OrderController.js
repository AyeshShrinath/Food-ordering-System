import OrderModel from "../Models/OrderModel.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addOrder = async (req, res) => {
  const order = req.body;
  const newOrder = new OrderModel(order);
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order;
    Model.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await OrderModel.findByIdAndRemove(id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = req.body;
  try {
    await Order;
    Model.findByIdAndUpdate(id, order, { new: true });

    res.json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteAllOrders = async (req, res) => {
  try {
    await OrderModel.deleteMany();
    res.json({ message: "All orders deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Path: backend/api/Models/ShrimpTypeModel.js
