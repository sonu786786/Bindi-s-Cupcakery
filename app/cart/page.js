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
    let total = 0;
    cartArray?.map((item) => {
      total += item.price;
    });
    return total;
  };

  useEffect(() => {
    setIsCartLoaded(cartArray?.length > 0);
  }, [cartArray]);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">
        {auth?.user ? `Hello ${auth.user.name}` : "Hello Guest"}
      </h1>
      <p className="text-center">
        {cartArray?.length
          ? `You Have ${cartArray.length} items in your cart ${
              auth?.token ? "" : "please login to checkout !"
            }`
          : "Your Cart Is Empty"}
      </p>
      <div className="row">
        <div className="col-md-8">
          {isCartLoaded &&
            cartArray.map((p, index) => (
              <div className="card mb-3" key={`${p._id}-${index}`}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                      className="img-fluid rounded-start"
                      alt={p.name}
                      style={{ maxHeight: "150px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h5>{p.name}</h5>
                    <p>{p.description.substring(0, 30)}...</p>
                    <p>Price: {p.price}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="col-md-4">
          <h2>Cart Summary</h2>
          <hr />
          <h4>Total: {totalPrice()}</h4>
          <div className="mt-3">
            <button
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg"
              onClick={(e) => paymentHandler(e, totalPrice())}
              disabled={!auth?.token || cartArray.length === 0}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
