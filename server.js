const express = require("express");
const app = express();
const mime = require("mime");
require("dotenv").config();

const nodemailer = require("nodemailer");
const pass = process.env.EMAILPASS;
const user = process.env.EMAIL;
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("uhhh lemme get uhhh form");
});
// app.get("/main.js", (req, res) => {
//   res.setHeader("Content-Type", "text/javascript");
//   res.sendFile(__dirname + "/main.js");
// });
// app.get("/contact.css", (req, res) => {

//   res.setHeader("Content-Type", "text/css");
//   res.sendFile(__dirname + "/contact.css");
// });
// app.get("/home.css", (req, res) => {

//   res.setHeader("Content-Type", "text/css");
//   res.sendFile(__dirname + "/home.css");
// });
// app.get("/homeMobile.css", (req, res) => {

//   res.setHeader("Content-Type", "text/css");
//   res.sendFile(__dirname + "/homeMobile.css");
// });

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
