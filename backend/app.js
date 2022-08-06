const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
// Import Routes

const otpRouter = require("./routes/otp");
const cookieParser = require("cookie-parser");
dotenv.config();
// Database Connection
mongoose
  .connect(process.env.DB_URI, {})
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });
// Routes

app.use(cookieParser());

app.use("/api/otp", otpRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
}
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
