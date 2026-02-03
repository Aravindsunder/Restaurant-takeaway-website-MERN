const express = require("express");
const cors = require("cors");
console.log("Hello world");
const app = express();
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//mongoose
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://group-l:YVQNrebu2Dj865U0@obamination.flq0ojb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=obamination"
  )
  .then(() => console.log("MongoDB Connected!"))
  .catch(() => console.log("MongoDB connection failed"));

app.use(logger);

app.get("/", (req, res) => {
  console.log("received request at index / ");
  res
    .status(200)
    .send(
      "<h1>Hello World!</h1> <br/></br> <p>This is the index page. This should eventually redirect to the home page on frontend</p>"
    );
});

app.get("/hello", (req, res) => {
  res.status(200).json({
    hello: "World",
    description: "This is a plain JSON response",
  });
});

function logger(req, res, next) {
  console.log(`request received: ${req.originalUrl}`);
  next();
}


// Assign routers to different paths

const itemRouter = require("./routes/items");
app.use("/items", itemRouter);

const orderRouter = require("./routes/orders");
app.use("/orders", orderRouter);

const restaurantRouter = require("./routes/restaurant");
app.use("/restaurant", restaurantRouter);

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(5000);
