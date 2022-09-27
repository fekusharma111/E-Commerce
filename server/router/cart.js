import express from "express";
import CartSchema from "../model/Cart.js";
import {
  verifyToken,
  verifyTokenandAdmin,
  verifyTokenandAuthorization,
} from "./VerifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyToken, async (req, res) => {
  const newCart = new CartSchema(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update cart

router.put("/:id", verifyTokenandAuthorization, async (req, res) => {
  try {
    const updatedCart = await CartSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenandAuthorization, async (req, res) => {
  try {
    await CartSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User Cart
router.get("/find/:id", verifyTokenandAuthorization, async (req, res) => {
  try {
    const cart = await CartSchema.findOne({ userId: req.user.id });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Get all cart
router.get("/", verifyTokenandAdmin, async (req, res) => {
  try {
    const carts = await CartSchema.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
