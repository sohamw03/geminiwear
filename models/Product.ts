import mongoose from "mongoose";

let Product: mongoose.Model<any, unknown, unknown, unknown, any, any>;

try {
  Product = mongoose.model("Product");
} catch (error) {
  const ProductSchema = new mongoose.Schema(
    {
      title: { type: String, require: true },
      slug: { type: String, require: true, unique: true },
      desc: { type: String, require: true },
      img: { type: String, require: true },
      category: { type: String, require: true },
      size: { type: [String] },
      color: { type: [String] },
      price: { type: Number, require: true },
      availableQty: { type: Number, require: true },
    },
    { timestamps: true }
  );
  Product = mongoose.model("Product", ProductSchema);
}

export default Product;
