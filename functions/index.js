const functions = require("firebase-functions/v1");
const {cert} = require("firebase-admin/app");
const admin = require("firebase-admin");
const serviceAccount = require("./credentials.json");
const dataRouter = require("./src/routes/data.router.js");
// const {getFirestore} = require("firebase-admin/firestore");
const express = require("express");
const cors = require("cors");

admin.initializeApp({
  credential: cert(serviceAccount),
});

const corsMiddleware = cors({origin: true});

const data = express();
data.use(corsMiddleware);
data.use(dataRouter);

exports.dataFunction = functions.https.onRequest(data);
