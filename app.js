// ====== DEPENDENCIES ======
const express = require("express");
const routes = require("./routes");
// const chalk = require("chalk");
require("dotenv/config");
const PORT = process.env.PORT || 3001;
const app = express();

// ====== MIDDLEWARE ======
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// ====== STATICS ======
app.use(express.static("public"));
app.use(express.static("assets"));

// ====== ROUTES ======
app.use(routes);

// ====== START SERVER ======
app.listen(PORT, function () {
  console.log(`API Server now listening at http://localhost:${PORT}`);
});
