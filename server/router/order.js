import express from "express";
import {
  verifyToken,
  verifyTokenandAdmin,
  verifyTokenandAuthorization,
} from "./VerifyToken.js";
import OrderSchema from "../model/Order.js";
const router = express.Router();

//Create
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new OrderSchema(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update cart

router.put("/:id", verifyTokenandAdmin, async (req, res) => {
  try {
    const updatedOrder = await OrderSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenandAdmin, async (req, res) => {
  try {
    await OrderSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User order
router.get("/find/:id", verifyTokenandAuthorization, async (req, res) => {
  try {
    const Orders = await OrderSchema.find({ userId: req.user.id });

    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Get all order
router.get("/", verifyTokenandAdmin, async (req, res) => {
  try {
    const Orders = await OrderSchema.find();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Monthly Income
router.get("/stats", verifyTokenandAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await OrderSchema.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
