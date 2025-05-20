const express = require("express");
const {getFirestore} = require("firebase-admin/firestore");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/pizzas", async (req, res) => {
  try {
    const db = getFirestore();

    const docRef = await db.collection("pizzas").doc("margerita");

    await docRef.set({
      title: "Hawaiana",
      description: "Pizza con jamón, piña y queso mozzarella.",
      price: "11.99",
      code: "PZ004",
      stock: 18,
      category: "Exóticas",
      status: true,
    });

    const vegetariana = db.collection("pizzas").doc("vegetariana");

    await vegetariana.set({
      title: "Vegetariana",
      description: "Pizza con pimientos, cebolla, aceitunas y champiñones.",
      price: "9.99",
      code: "PZ005",
      stock: 10,
      category: "Vegetarianas",
      status: true,
    });

    const barbacoa = db.collection("pizzas").doc("barbacoa");

    await barbacoa.set({
      title: "Barbacoa",
      description: "Pizza con carne de res, cebolla y salsa BBQ.",
      price: "13.99",
      code: "PZ006",
      stock: 14,
      category: "Carnes",
      status: true,
    });

    const napolitana = db.collection("pizzas").doc("napolitana");

    await napolitana.set({
      title: "Napolitana",
      description: "Pizza con anchoas, alcaparras y aceitunas.",
      price: "9.49",
      code: "PZ007",
      stock: 12,
      category: "Clásicas",
      status: true,
    });

    res.status(200).send("Pizzas registradas exitosamente");
  } catch (error) {
    res.status(500).json({
      message: `No se pudo ejecutar el seteo de datos por este error: ${error}`,
      error: true,
    });
  }
});

router.get("/pizzas", async (req, res) => {
  try {
    const db = getFirestore();

    const snapshot = await db.collection("pizzas").get();

    if (snapshot.length === 0) {
      res.status(200).json({
        message: "BBDD encontrada pero con hambre porque no hay pizzas",
      });
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });

    // eslint-disable-next-line max-len
    res
        .status(200)
        .json({message: "A comer!! las pizzas están recién salidas del horno"});
  } catch (error) {
    res.status(500).json({message: `Error al pedir las pizzas`, error: true});
  }
});

router.put("/pizzas", async (req, res) => {
  try {
    const db = getFirestore();

    const docRef = await db.collection("pizzas").doc("pepperoni");

    await docRef.update({status: true});

    res.status(200).send("Se actualizó el documento correctamente");
  } catch (error) {
    // eslint-disable-next-line max-len
    res
        .status(500)
        .send("Error, error, error ... no se pudo actualizar el documento");
  }
});

router.get("/pizzas/:pid", async (req, res) => {
  try {
    const db = getFirestore();
    const id = req.params.pid;

    const docRef = db.collection("pizzas").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        message: `La pizza con ID ${id} no existe`,
        error: true,
      });
    }

    return res.status(200).json({
      id: doc.id,
      data: doc.data(),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener la pizza",
      error: error.message,
    });
  }
});

router.post(
    "/pizzas/:title/:description/:price/:code/:stock/:category/:status/:pid",
    async (req, res) => {
      try {
        const db = getFirestore();

        const {title, description, price, code, stock, category, status, pid} =
        req.params;

        if (
          !title ||
        !description ||
        !price ||
        !code ||
        !stock ||
        !category ||
        !status
        ) {
          return res.status(400).json({
            message: "Todos los parámetros son obligatorios",
            error: true,
          });
        }

        const docRef = db.collection("pizzas").doc(pid);

        await docRef.set({
          title,
          description,
          price: parseFloat(price), // Convertir precio a número
          code,
          stock: parseInt(stock), // Convertir stock a número
          category,
          status: status === "true", // Convertir status a booleano
        });

        res
            .status(201)
            .json({message: `Pizza ${title} guardada correctamente`, id: code});
      } catch (error) {
        console.error("Error al guardar la pizza:", error);
        res
            .status(500)
            .json({message: "Error al guardar la pizza", error: error.message});
      }
    },
);

module.exports = router;
