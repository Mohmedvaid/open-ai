const { Router } = require("express");
const path = require("path");
const router = Router();
const axios = require("axios");

// HTML Routes
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/html/home.html"))
);

// API Routes

router.post("/api/chat", (req, res) => {
  const { prompt } = req.body;
  console.log(req.body);
  if (prompt.length === 0) {
    res.status(400).send("Please enter a prompt");
    return;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  };
  const data = req.body;
  const url = "https://api.openai.com/v1/engines/text-curie-001/completions";

  return axios
    .post(url, data, config)
    .then((res) => res.data)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error");
    });
});

module.exports = router;
