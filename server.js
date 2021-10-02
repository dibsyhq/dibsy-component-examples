const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
// This is your Dibsy Secret API Key.
const DIBSY_SECRET_API = process.env.DIBSY_SECRET_API;

const PORT = process.env.PORT || 4545;
const DIBSY_API_ENDPOINT = process.env.DIBSY_API_ENDPOINT;

app.use(express.static("public"));
app.use(express.json());

// This endpoint is called from your frontend to your backend.
// Call the backend and recieve the payment token.

app.post("/init-payment", async (req, res) => {
  const paymentRequest = {
    amount: 50,
    description: "iPhone 13 - Gold Edition",
    redirectUrl: "https://example.com/success",
  };

  try {
    const payment_response = await axios.post(
      `${DIBSY_API_ENDPOINT}/payments`,
      paymentRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${DIBSY_SECRET_API}`,
        },
      }
    );
    res.send(payment_response.data);
  } catch (error) {
    res.status(400);
    res.send({
      message: "There was an error while trying to create a payment.",
    });
  }
});

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
