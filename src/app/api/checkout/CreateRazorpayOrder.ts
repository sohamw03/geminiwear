import Razorpay from "razorpay";
export default async function CreateRazorpayOrder(data: { amount: number; currency: string; receipt: string }) {
  // Initialize the Razorpay instance
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_KEY_ID as string,
    key_secret: process.env.RAZORPAY_TEST_KEY_SECRET as string,
  });

  // Setting up the options for razorpay order
  const options = {
    amount: data.amount,
    currency: data.currency,
    receipt: data.receipt,
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    return {
      success: true,
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    };
  } catch (error) {
    return {
      success: false,
      error: `${error}`,
    };
  }
}
