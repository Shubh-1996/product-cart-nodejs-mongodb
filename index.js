const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")
const mongoose = require("mongoose");
const Product = require("./models/product");
const Cart = require("./models/cart");

//app.listen(3000, () => console.log("Server Up and running"));

// //connection to db
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    app.listen(process.env.PORT || 3000, () => console.log("Mongoose Server Up and running"));
})

// Post
//Add Product API
app
    .route("/add-product")
    .post(async (req, res) => {
        const product = new Product({
            productName: req.body.productName,
            productImage: req.body.productImage,
            description: req.body.description,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice,

        });
        try {
            await product.save();
            res.send({ "Product": "successfully added" });

        } catch (err) {
            res.send({ "error": err });
        }
    });

    // List of Product API
    app
    .route("/getAllproduct")
    .get((req, res) => {
        Product.find({}, (err, obj) => {
            res.send(obj);
        });
    });
    
    // Post method for Add to cart API

    app
    .route("/add-to-cart")
    .post(async (req, res) => {
        const cart = new Cart({
            productName: req.body.productName,
            productQuantity: req.body.productQuantity,
            productPrice: req.body.productPrice,

        });
        try {
            await cart.save();
            res.send({ "Product": "successfully added to Cart" });

        } catch (err) {
            res.send({ "error": err });
            console.log("err");
        }
    });

// API for Update Product Quantity on cart
app
    .route("/update-quantity")
    .post((req, res) => {
        const id = req.body._id;
        Cart.findById(id, (err,obj) => {
            if(err) {
                res.send({"error": "Record not found"})
            } else {
                obj.productQuantity = req.body.productQuantity;
                obj.save((error) => {
                    if(error) {

                    } else {
                        res.json({

                            "Product" : "Successfully updated in Cart",
                            "data": obj
                        })
                    }
                })
            }
        }
        );
    });



    //List Cart API

app
.route("/getAllcart")
.get((req, res) => {
    Cart.find({}, (err, obj) => {
        res.send(obj);
    });
});