"use client";
import { useGlobal } from "@/contextWithDrivers/GlobalContext";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function RenderRazorpay({ orderId, keyId, keySecret, currency, amount }: { orderId: string; keyId: string; keySecret: string; currency: string; amount: number }) {
  // Global Context
  const { cart, user, clearCart } = useGlobal();

  const router = useRouter();

  // Refrences to store payment id and payment method.
  const paymentId = useRef(null);

  // Handle success payment from razorpay
  const handleSuccessPayment = async (data: any) => {
    console.log("Payment successfull with data: ", data);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "successpayment",
          amount: amount,
          paymentMethod: "razorpay",
          paymentId: data.razorpay_payment_id,
          orderId: data.razorpay_order_id,
          user,
          cart,
        }),
      });
      const responseJson = await response.json();
      if (responseJson.success && response.ok) {
        clearCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Function to load script and append in DOM tree.
    const loadScript = (src: string) =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.classList.add("razorpay-script");
        script.src = src;
        script.onload = () => {
          console.log("Razorpay script loaded successfully.");
          resolve(true);
        };
        script.onerror = () => {
          console.log("Error loading razorpay script.");
          resolve(false);
        };
        document.body.appendChild(script);
      });

    // To load razorpay checkout modal script.
    const displayRazorpay = async (options: any) => {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        console.log("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // All information is loaded in options.
      const rzp1 = new (window as any).Razorpay(options);

      // to open razorpay checkout modal.
      rzp1.open();
    };

    const removeRazorpay = () => {
      document.querySelectorAll(".razorpay-container").forEach((el) => el.remove());
      document.querySelectorAll(".razorpay-script").forEach((el) => el.remove());
    };

    // informing server about payment
    const handlePayment = async (status: "succeeded" | "failed" | "cancelled" | "timedout", data?: any) => {
      console.log("Informing server about payment status.");
      console.log({ data });
      switch (status) {
        case "succeeded":
          handleSuccessPayment(data);
          removeRazorpay();
          toast.success("Payment successful.", { position: "bottom-center" });
          setTimeout(() => {
            window.location.href = "/order";
          }, 1000);
          break;
        case "failed":
          removeRazorpay();
          toast.error("Payment failed.", { position: "bottom-center" });
          break;
        case "cancelled":
          removeRazorpay();
          toast.error("Payment cancelled.", { position: "bottom-center" });
          break;
        case "timedout":
          removeRazorpay();
          toast.error("Payment timed out.", { position: "bottom-center" });
          break;
        default:
          break;
      }
    };

    // we will be filling this object in next step.
    const options = {
      key: keyId, // key id from props
      amount, // Amount in lowest denomination from props
      currency, // Currency from props.
      name: "GeminiWear", // Title for your organization to display in checkout modal
      // image, // custom logo  url
      order_id: orderId, // order id from props
      // This handler menthod is always executed in case of succeeded payment
      handler: (response: any) => {
        console.log("Succeeded");
        console.log(response);
        paymentId.current = response.razorpay_payment_id;

        // Most important step to capture and authorize the payment. This can be done of Backend server.
        const hmac = crypto.createHmac("sha256", keySecret);
        hmac.update(orderId + "|" + response.razorpay_payment_id);
        const succeeded = hmac.digest("hex");

        // If successfully authorized. Then we can consider the payment as successful.
        if (succeeded === response.razorpay_signature) {
          handlePayment("succeeded", {
            orderId,
            paymentId,
            signature: response.razorpay_signature,
          });
        } else {
          handlePayment("failed", {
            orderId,
            paymentId: response.razorpay_payment_id,
          });
        }
      },
      modal: {
        confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
        // This function is executed when checkout modal is closed
        // There can be 3 reasons when this modal is closed.
        ondismiss: async (reason: any) => {
          const { reason: paymentReason, field, step, code }: any = reason && reason.error ? reason.error : {};
          // Reason 1 - when payment is cancelled. It can happen when we click cross icon or cancel any payment explicitly.
          if (reason === undefined) {
            console.log("cancelled");
            handlePayment("cancelled");
          }
          // Reason 2 - When modal is auto closed because of time out
          else if (reason === "timeout") {
            console.log("timedout");
            handlePayment("timedout");
          }
          // Reason 3 - When payment gets failed.
          else {
            console.log("failed");
            handlePayment("failed", {
              paymentReason,
              field,
              step,
              code,
            });
          }
        },
      },
      // This property allows to enble/disable retries.
      // This is enabled true by default.
      retry: {
        enabled: false,
      },
      timeout: 900, // Time limit in Seconds
      theme: {
        color: "#020817", // Custom color for your checkout modal.
      },
    };

    displayRazorpay(options);
    return () => {
      removeRazorpay();
    };
  }, []);

  return <span className="hidden">Razorpay</span>;
}
