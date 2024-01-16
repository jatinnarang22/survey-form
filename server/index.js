const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 5000;
const auth = require("./router/auth");
const form = require("./router/form");

//connection with mongodb
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://njatin3435:jatinnarang22@cluster0.clvzb1o.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware

app.use(cors());

app.set("views", path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // it parses the incoming request with jSON

app.use(auth);
app.use(form);

// connection to start the server
app.listen(port, () => {
  console.log(`server connected at port ${port}`);
});
