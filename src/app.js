/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const express = require("express");
const { json, urlencoded } = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const logger = require("morgan");
const { platform } = require("os");
const { textSync } = require("figlet");
require("colors");
const routes = require("./routes/routes");
const db = require("./db/connection");
const { appHost, appName, appAutor, appPort } = require("./config/config");

/*******************************************************************************************************/
// Declaramos la variable de aplicación express //
/*******************************************************************************************************/
const app = express();

/*******************************************************************************************************/
// Middlewares de la aplicación //
/*******************************************************************************************************/
app.use(json()); // Realiza un parse de los formatos aplication/json
app.use(urlencoded({ extended: false })); // Decodifica los datos enviados desde un formulario
app.use(cookieParser()); // Realiza un parse de las cookies en las peticiones http al servidor
app.use("*", cors()); // Permite acceder a recursos del servidor desde otros dominios
app.use(compression()); // Habilita la compresión en todas las responses del servidor
app.use(logger("combined")); // Logs para ver las peticiones o request http al servidor

/*******************************************************************************************************/
// Llamamos las Rutas de la Aplicación //
/*******************************************************************************************************/
routes(app);

/*******************************************************************************************************/
// Nos conectamos a la base de datos //
/*******************************************************************************************************/
db.connection();

/*******************************************************************************************************/
// Arrancamos el Servidor de Express //
/*******************************************************************************************************/
app.listen(appPort, () => {
  console.log(
    "*********************************************************".rainbow
  );
  console.log(textSync(appAutor).blue.bold);
  console.log(
    "*********************************************************".rainbow
  );
  console.log(appName.red.bold);
  console.log(
    `🚀 Servidor ${platform().toUpperCase()}, listo en : `.yellow.bold +
      `${appHost}:${appPort}`.white.bold
  );
  console.log(
    "*********************************************************".rainbow
  );
});
