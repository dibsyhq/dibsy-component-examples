const express = require('express');
const axios = require('axios').default; 
const app = express();

app.use(express.static("public"))

const sk="sk_live_c3fa66e70c7022aaa0e6c75da58522e280b7"
const baseUrl = "http://localhost:5000/v1"

const orders = {}

app.post("/create-payment",async (req,res)=>{
    const orderId = Object.keys(orders).length+1
    const response = await axios({
        method:'POST',
        baseURL:baseUrl,
        url:"/payments",
        headers:{
            "authorization":"Bearer "+sk
        },
        data:{
            amount:59,
            description:"Test card component",
            redirectUrl:"http://localhost:3000/callback/"+orderId,
            metadata:{
                orderId
            }
        }
    })
    const paymentId = response.data.id
    orders[orderId] = paymentId
    return res.send(response.data.paymentToken);
})


app.get("/callback/:orderId",(req,res)=>{
    const send = `
        <html>
            <body>
                <h1>Thank you you order #${req.params.orderId} has completed with</h1>
                <h2>Transaction id #${orders[req.params.orderId]}</h2>
            </body>
        </html>
    `
    res.send(send)
})

app.listen(3000)