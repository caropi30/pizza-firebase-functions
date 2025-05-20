const express = require("express");
const fetch = require("node-fetch");

require("dotenv").config();

const SIGNAPIUSER = process.env.SIGNAPIUSER;
const SIGNAPIPASS = process.env.SIGNAPIPASS;
const SIGNAPIKEY = process.env.SIGNAPIKEY;

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log("Holaaaa");
    console.log("key --->", SIGNAPIKEY);
    const url = "https://api-sandbox.signapis.com/v2/login";
    console.log("url --->", url);
    const body = {
      email: SIGNAPIUSER,
      password: SIGNAPIPASS,
    };
    console.log("body --->", body);

    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SIGNAPIKEY,
      },
      body: JSON.stringify(body),
    });
    console.log("data --->", data);
    const response = await data.json();

    res.status(response.code).json({message: response.message});
  } catch (error) {
    console.log("Chaoooo");
    throw new Error("no se logró " + error);
  }
});

router.post("/create-logo", async (req, res) => {
  try {
    const token = "";

    const body = {
      name: "logoPrincipal",
      code: "signApiLogo",
      image: "signApiLogo.png",
    };

    const url = "https://api-sandbox.signapis.com/v2/company/emailLogos";
    const signapiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SIGNAPIKEY,
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!signapiResponse.ok) {
      throw new Error(
          `Error: ${signapiResponse.status} - ${signapiResponse.statusText}`,
      );
    }

    const data = await signapiResponse.json();
    console.log("Logo creado con éxito:", data);
  } catch (error) {
    console.error("Error al crear el logo:", error);
  }
});

module.exports = router;
