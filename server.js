const express = require("express");
const app = express();
const mime = require("mime");
const cors = require("cors");
require("dotenv").config();

const nodemailer = require("nodemailer");
const pass = process.env.EMAILPASS;
const user = process.env.EMAIL;
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("uhhh lemme get uhhh form");
});
app.use(
  cors({
    origin: "http://localhost:53440", // Replace with the actual origin of your frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.post("/form", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    auth: {
      user: user,
      pass: pass,
    },
  });
  const mailOptions = {
    from: req.body.email,
    to: "morseylane@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
