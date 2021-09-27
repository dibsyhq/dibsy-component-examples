const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();


// This is your test secret API key.
const DIBSY_SECRET_API = process.env.DIBSY_SECRET_API;
const PORT = process.env.PORT || 4545;
const DIBSY_API_ENDPOINT = process.env.DIBSY_API_ENDPOINT;


app.use(express.static("public"));
app.use(express.json());


// THIS ENDPOINT IS CALLED FROM YOUR FRONTEND 
// IT CALLS CREATE PAYMENT API AND RETURNS PAYMENT TOKEN
app.post("/init-credit-card", async (req, res) => {

  const paymentObject = {
    "description":"Gold Style Watch - Special Edition",
    "amount": 56.99,
    "metadata":{
       "product_id": 156,
       "customer_id": 345
    },
    "customer":{
       "name":"John Doe",
       "email":"your_customer@email.com",
       "phone":"+97433333333"
    },
    "redirectUrl":"https://example.com"
 }


    try {
      const payment_response = await axios.post(
        `${DIBSY_API_ENDPOINT}/payments`,
        paymentObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${DIBSY_SECRET_API}`,
          },
        }
      );
      res.send(payment_response.data);
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send({
        message: "There was an error while trying to create payment",
      });
    }
  });
  

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
