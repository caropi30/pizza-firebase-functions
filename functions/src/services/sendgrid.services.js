const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");

const sendEmail = async (to, subject, from, pizzaData = {}) => {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const defaultFrom = process.env.SENDGRID_MAIL;
  const defaultTo = process.env.SENDGRID_EMAIL;

  if (!SENDGRID_API_KEY) {
    throw new Error(
        "SENDGRID_API_KEY is not defined in environment variables",
    );
  }

  if (!defaultFrom) {
    throw new Error(
        "SENDGRID_FROM_EMAIL is not defined in environment variables",
    );
  }

  // Configurar la API key de SendGrid
  sgMail.setApiKey(SENDGRID_API_KEY);

  // Obtener la ruta absoluta al archivo HTML
  const templatePath = path.join(__dirname, "../../misc/html/welcome.html");

  let templateHtml = "";

  try {
    templateHtml = fs.readFileSync(templatePath, "utf8");

    // Reemplazar las variables en el template
    templateHtml = templateHtml
        .replace(/{{name}}/g, pizzaData.name || "Sin nombre")
        .replace(/{{description}}/g, pizzaData.description || "Sin descripción")
        .replace(/{{price}}/g, pizzaData.price || "0")
        .replace(/{{code}}/g, pizzaData.code || "0")
        .replace(/{{stock}}/g, pizzaData.stock || "0")
        .replace(/{{category}}/g, pizzaData.category || "Sin categoría")
        .replace(/{{status}}/g, pizzaData.status || "Sin estado")
        .replace(/{{pid}}/g, pizzaData.pid || "Sin ID");
  } catch (error) {
    console.error(
        "Error reading template file:",
        error,
    );
    templateHtml = "<h1>Bienvenido</h1><p>Este es un correo de bienvenida</p>";
  }

  const msg = {
    to: to || defaultTo,
    from: from || defaultFrom,
    subject: subject || "Prueba de correo desde SendGrid",
    html: templateHtml,
  };

  try {
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error(
          "SendGrid API Error:",
          error.response.body,
      );
    }
    throw error;
  }
};

module.exports = {sendEmail};

