"use client"; // Ensure it's a client component

import React, { useState, useEffect } from "react";
import { useCart } from "../../Context/cart";
import { useAuth } from "../../Context/auth";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const paymentHandler = async (e, amount) => {
    e.preventDefault();

    const receiptId = "qwsaq1";
    console.log("amount = ", amount);

    try {
      // Create Razorpay Order
      const response = await fetch("http://localhost:4000/api/v1/payment/create-order", {
        method: "POST",
        body: JSON.stringify({
          amount: amount,
          currency: "INR",
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const textResponse = await response.text();
        throw new Error(`Server Error: ${response.status} - ${textResponse}`);
      }

      const order = await response.json();
      console.log("Order Created: ", order);

      var options = {
        key: "rzp_test_mZGFuX4QG8UG7y", // Replace with your actual Razorpay Key ID
        amount: amount * 100,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment Successful: ", response);

          const orderDetails = {
            userId: "67ae3b5bb1e1642a2f53011c", // Replace with dynamic user ID
            payStatus: "paid",
            orderId: order.id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: amount,
            orderItems: cartArray, // Send the cart items
            userShipping: auth.user, // User shipping details
            orderDate: new Date().toISOString(),
          };

          // Send order details to backend
          const saveOrderRes = await fetch("http://localhost:4000/api/v1/payment/verify-payment", {
            method: "POST",
            body: JSON.stringify(orderDetails),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!saveOrderRes.ok) {
            const errorText = await saveOrderRes.text();
            throw new Error(`Order Save Error: ${saveOrderRes.status} - ${errorText}`);
          }

          const saveOrderJson = await saveOrderRes.json();
          console.log("Order Saved Successfully: ", saveOrderJson);
          alert("Payment Successful and Order Saved!");
        },
        prefill: {
          name: "Web Dev Matrix",
          email: "webdevmatrix@example.com",
          contact: "9000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert("Payment Failed: " + response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error in payment processing: ", error.message);
      alert("Error processing payment. Please try again.");
    }
  };

  const [auth] = useAuth();
  const { cart, setCart } = useCart();
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const cartArray = Array.isArray(cart) ? cart : [];

  const totalPrice = () => {
    return cartArray.reduce((total, item) => total + item.price, 0);
  };

  useEffect(() => {
    setIsCartLoaded(cartArray.length > 0);
  }, [cartArray]);

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
        {auth?.user ? `Hello, ${auth.user.name}!` : "Hello, Guest!"}
      </h1>
      <p className="text-center text-lg text-gray-600">
        {cartArray.length
          ? `You have ${cartArray.length} items in your cart ${
              auth?.token ? "" : " - please log in to checkout!"
            }`
          : "Your cart is empty."}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          {isCartLoaded ? (
            cartArray.map((p, index) => (
              <div key={`${p._id}-${index}`} className="bg-white shadow-md rounded-lg p-4 flex gap-6 mb-4 border border-gray-200">
                <img
                  src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="w-28 h-28 object-cover rounded-md border border-gray-300"
                />
                <div className="flex-1">
                  <h5 className="text-xl font-semibold text-gray-700">{p.name}</h5>
                  <p className="text-gray-500">{p.description.substring(0, 50)}...</p>
                  <p className="text-lg font-semibold text-gray-800 mt-2">₹{p.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">Your cart is currently empty.</p>
          )}
        </div>

        {/* Cart Summary Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Cart Summary</h2>
          <hr className="my-4" />
          <h4 className="text-lg font-medium text-gray-700">Total Amount: ₹{totalPrice()}</h4>
          <button
            className="w-full py-3 mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
            onClick={(e) => paymentHandler(e, totalPrice())}
            disabled={!auth?.token || cartArray.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
