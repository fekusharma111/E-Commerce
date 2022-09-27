import express from "express";
import { verifyTokenandAdmin } from "./VerifyToken.js";
import ProductSchema from "../model/Product.js";

const router = express.Router();

//Create
router.post("/", verifyTokenandAdmin, async (req, res) => {
  const newProduct = new ProductSchema(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update product

router.put("/:id", verifyTokenandAdmin, async (req, res) => {
  try {
    const updatedProduct = await ProductSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenandAdmin, async (req, res) => {
  try {
    await ProductSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a Product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Get all Product
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await ProductSchema.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await ProductSchema.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await ProductSchema.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
//   // Get user Stats
//   router.get("/stats", verifyTokenandAdmin, async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//     try {
//       const data = await UserSchema.aggregate([
//         {
//           $match: { createdAt: { $gte: lastYear } },
//         },
//         {
//           $project: {
//             month: {
//               $month: "$createdAt",
//             },
//           },
//         },
//         {
//           $group: {
//             _id: "$month",
//             total: { $sum: 1 },
//           },
//         },
//       ]);
//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });

export default router;
