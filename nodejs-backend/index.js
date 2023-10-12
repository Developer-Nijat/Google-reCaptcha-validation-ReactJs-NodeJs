const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded());

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.get("/", function (req, res) {
  res.json("Hello");
});

app.post("/test-recaptcha", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json("Recaptcha token is required");
    }
    const secretKey = "6LcN1nIoAAAAAEzyo7zZbEGjfpqxP3IQChQYcCD8";
    const { data, status, statusText } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );
    if (data.success) {
      // continue some model save operations
      console.log("Demo Model saved");
      return res.json({ data, status, statusText });
    } else {
        console.log("Demo Model saved failed");
      return res.status(400).json({ data, message: "Invalid recapthca" });
    }
  } catch (error) {
    console.log("test-recaptcha error", error);
    return res.status(400).json("Failed");
  }
});

app.listen(port, () => console.log(`Backend running on PORT: ${port}`));
