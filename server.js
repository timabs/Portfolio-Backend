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
    origin: ["https://morselane.com", "https://timurabdullayev.netlify.app"],
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
    from: {
      name: req.body.name,
      address: user,
    },
    to: user,
    subject: `Message from ${req.body.email}`,
    text: req.body.content,
    replyTo: req.body.email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200).json({ message: `Mail sent successfully` });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
