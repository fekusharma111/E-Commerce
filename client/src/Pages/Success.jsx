import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethod";

const Success = () => {
  const location = useLocation();
  const data = location.state.paymentid;
  const cart = location.state.products;
  const [orderId, setOrderId] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          // address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    data && createOrder();
    console.log("order api calls");
  }, [cart, data, currentUser]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;
