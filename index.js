require("dotenv").config()
const express = require('express')
const cors = require('cors')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/Auth")
const productRoutes = require("./routes/Product")
const orderRoutes = require("./routes/Order")
const cartRoutes = require("./routes/Cart")
const brandRoutes = require("./routes/Brand")
const categoryRoutes = require("./routes/Category")
const userRoutes = require("./routes/User")
const addressRoutes = require('./routes/Address')
const reviewRoutes = require("./routes/Review")
const wishlistRoutes = require("./routes/Wishlist")
const { connectToDB } = require("./database/db")


// server init
const server = express();

// database connection
connectToDB();

// middlewares
const corsOptions = {
    origin: '*', // Allow requests from any origin
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these header
    optionsSuccessStatus: 200, // Set the status code for CORS preflight requests
};

server.use(cors(corsOptions));

server.options("*", cors({ origin: '*',"optionsSuccessStatus": 200}));



server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// ... (rest of your code)


// routeMiddleware
server.use("/auth", authRoutes)
server.use("/users", userRoutes)
server.use("/products", productRoutes)
server.use("/orders", orderRoutes)
server.use("/cart", cartRoutes)
server.use("/brands", brandRoutes)
server.use("/categories", categoryRoutes)
server.use("/address", addressRoutes)
server.use("/reviews", reviewRoutes)
server.use("/wishlist", wishlistRoutes)

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true"); // Add this line to allow credentials
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH,OPTIONS"); // Update to match the allowed methods of your API
    res.header("Access-Control-Expose-Headers", "'X-Api-Version', 'Accept-Version', 'Content-MD5', 'Access-Control-Request-Headers', 'Date', 'X-Total-Count', 'Access-Control-Request-Method', 'X-CSRF-Token', 'X-API-KEY', 'Origin', 'Content-Type', 'Authorization', 'Accept', 'Content-Length', 'X-Requested-With"); // Add this line to expose headers you want to return
    res.header("Access-Control-Max-Age", "86400"); // Set cache control to 24 hours
    res.header("Access-Control-Request-Headers", "Content-Type, Authorization"); // Add this line to allow headers you want to send in the request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    res.status(200); 
    next();
});

server.get("/", (req, res) => {
    res.status(200).json({ message: 'Server is running' })
})

server.get("/testcors", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).json({ message: 'CORS is working' });
});


server.listen(process.env.PORT || 8000, () => {
    console.log('server [STARTED] ~ http://localhost:' + process.env.PORT);
})