require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/authRouter");
const authMiddleware = require("./middlewares/verifyToken");

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDb is connected");
  }
);
