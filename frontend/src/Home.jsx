import React, { useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const checkoutHandler = async (amount) => {
    try {
      const response = await axios.post("http://localhost:4000/api/checkout", {
        amount,
      });
      const { order } = response.data;
      const options = {
        key: process.env.REACT_APP_RAZORPAY_API_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Quickbite Express",
        description: "Tutorial of RazorPay",
        image:
          "https://i.postimg.cc/g07HZXq9/res-logo-2f9021c4ef5fe532038e.png",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
          name: "rahul",
          email: "rah283570@gmail.com",
          contact: "6294382553",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorDescription = error.response.data.error.description;
        console.error("Authentication failed:", errorDescription);
        setErrorMessage(errorDescription);
      } else {
        console.error("Error during checkout:", error);
        setErrorMessage(
          "An error occurred during checkout. Please try again later."
        );
      }
    }
  };

  return (
    <Box>
      <Stack
        h={"100vh"}
        alignItems="center"
        justifyContent="center"
        direction={["column", "row"]}
      >
        <Card
          amount={5000}
          img={
            "https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"
          }
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={3000}
          img={
            "http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"
          }
          checkoutHandler={checkoutHandler}
        />
      </Stack>
      {errorMessage && (
        <Box mt={4} color="red">
          {errorMessage}
        </Box>
      )}
    </Box>
  );
};

export default Home;
