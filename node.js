// server.js
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000; // You can change the port if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Contact Form Route
app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, msg: "All fields are required" });
  }

  try {
    // Configure mail transporter (use your email + app password)
    let transporter = nodemailer.createTransport({
      service: "gmail", // or use "smtp.yourdomain.com"
      auth: {
        user: "ankitsinduria70@gmail.com",
        pass: "A1n2k3i4t5" // generate app password if using Gmail
      }
    });

    // Email content
    let mailOptions = {
      from: email,
      to: "ankitsinduria70@gmail.com", // where you want to receive leads
      subject: `New Lead from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, msg: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Something went wrong. Please try again." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
