const express = require("express");
const axios = require("axios").default;
const app = express();

app.use(express.json())
app.use(express.static("public"));

const DIBSY_SECRET_KEY = "sk_test_24382ce57ea8686921f128be22d65ddf9706";
const DIBSY_API_ENDPOINT = "https://api.dibsy.one/v1";

app.post("/create-payment", async (req, res) => {
  const response = await axios({
    method: "POST",
    baseURL: DIBSY_API_ENDPOINT,
    url: "/payments",
    headers: {
      authorization: `Bearer ${DIBSY_SECRET_KEY}`,
    },
    data: {
      description: "Gold Style Watch - Special Edition",
      amount: 56.99,
      metadata: {
        product_id: 156,
        customer_id: 345,
      },
      customer: {
        name: "John Doe",
        email: "your_customer@email.com",
        phone: "+97433333333",
      },
      // redirectUrl: "https://example.com/order",
      // webhookUrl: "https://32f5-37-186-53-196.ngrok.io/recieve-webhook"
    },
  });

  return res.send(response.data.paymentToken);
});


app.post("/recieve-webhook", async (req, res) => {
  console.log(req.body)
  res.status(200).send('OK')
});
app.listen(3000);
