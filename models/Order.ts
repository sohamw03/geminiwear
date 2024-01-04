import mongoose from "mongoose";

let Order;

try {
  Order = mongoose.model("Order");
} catch (error) {
  const OrderSchema = new mongoose.Schema(
    {
      userId: { type: String, require: true },
      products: [
        {
          productId: { type: String },
          quantity: { type: Number, default: 1 },
        },
      ],
      address: { type: String, require: true },
      amount: { type: Number, require: true },
      status: { type: String, default: "pending", require: true },
    },
    { timestamps: true }
  );
  Order = mongoose.model("Order", OrderSchema);
}

export default Order;
