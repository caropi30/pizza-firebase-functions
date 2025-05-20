const functions = require("firebase-functions/v1");
const {cert} = require("firebase-admin/app");
const admin = require("firebase-admin");
const serviceAccount = require("./credentials.json");
const dataRouter = require("./src/routes/data.router.js");
const signApiRouter = require("./src/routes/signapi.router.js");
const welcomeRouter = require("./src/routes/welcome.router.js");
const {sendEmail} = require("./src/services/sendgrid.services");
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

const signApi = express();
// signApi.use(corsMiddleware);
signApi.use(signApiRouter);

exports.signApiFunction = functions.https.onRequest(signApi);

const welcome = express();
welcome.use(corsMiddleware);
welcome.use(welcomeRouter);

exports.welcomeFunction = functions.https.onRequest(welcome);

const welcome2 = express();
welcome2.use(corsMiddleware);
welcome2.use(welcomeRouter);

// eslint-disable-next-line max-len
exports.welcome2Function = functions.firestore.document("pizzas/{pid}").onCreate(async (snapshot, context) => {
  try {
    const pid = context.params.pid;
    const pizza = snapshot.data();
    const email = process.env.SENDGRID_MAIL;

    console.log("Nueva pizza creada:", pizza);

    // Enviar email de notificación con los datos de la pizza
    await sendEmail(
        email,
        `Nueva pizza creada: ${pizza.name || "Sin nombre"}`,
        email,
        pizza,
    );

    console.log("Email de notificación enviado para la pizza:", pid);
    return null;
  } catch (error) {
    console.error("Error al procesar la creación de pizza:", error);
    throw error;
  }
});
