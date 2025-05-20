const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/test", async (req, res) => {
  res.status(200).send("Lo he logrado");
});

module.exports = router;
