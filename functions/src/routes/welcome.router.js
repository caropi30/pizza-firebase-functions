const express = require("express");
const cors = require("cors");
// eslint-disable-next-line new-cap
const router = express.Router();
const {sendEmail} = require("../services/sendgrid.services");
// Enable CORS for all routes
router.use(
    cors({
      origin: true, // Allow all origins
      methods: ["POST", "GET"], // Allow POST and GET methods
      credentials: true, // Allow credentials
    }),
);

// Middleware para parsear el body como JSON
router.use(express.json());

router.get("/", async (req, res) => {
  res.status(200).send("Sendgrid module is running");
});

router.post("/sendEmail", async (req, res) => {
  const email = process.env.SENDGRID_MAIL;
  try {
    await sendEmail(email, "Bienvenido a nuestra plataforma", email);
    res.status(200).json({message: "Email sent successfully"});
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});


module.exports = router;
