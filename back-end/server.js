const cors = require("cors");
const express = require("express");
require('dotenv').config();
const STRIPE_SECRECT_KEY = process.env.STRIPE_SECRECT_KEY;
const stripe = require("stripe")(STRIPE_SECRECT_KEY);
const app = express();
const uuid = require("uuid/v4");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is the server");
});
app.post("/purchase", async (req, res) => {
  console.log(req.body);

  let error;
  let status;
  try {
    const { token, price } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: price,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

app.listen(5000);
