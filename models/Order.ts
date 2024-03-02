import mongoose from "mongoose";

interface IOrder extends Document {
  userId: string;
  products: Array<any>;
  address: string;
  amount: number;
  paymentMethod: string;
  phoneNumber: string;
  status: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
}

let Order: mongoose.Model<IOrder>;

try {
  Order = mongoose.model<IOrder>("Order");
} catch (error) {
  const OrderSchema = new mongoose.Schema(
    {
      userId: { type: String, require: true },
      products: { type: Array, require: true },
      address: { type: String, require: true },
      amount: { type: Number, require: true },
      paymentMethod: { type: String, require: true },
      phoneNumber: { type: String, require: true },
      status: { type: String, default: "pending", require: true },
      razorpayPaymentId: { type: String },
      razorpayOrderId: { type: String },
    },
    { timestamps: true }
  );
  Order = mongoose.model<IOrder>("Order", OrderSchema);
}

export default Order;
