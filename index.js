const express = require("express");
const mongoose = require("mongoose");
const { json } = require("express");
const routes = require("./routes/userRoute");
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
console.log("Database Connected successfully");
});

const app = express();

app.use(json());

app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});