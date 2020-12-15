/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const dotenv = require("dotenv");

/*******************************************************************************************************/
// Habilitamos las variable de entorno //
/*******************************************************************************************************/
dotenv.config();

/*******************************************************************************************************/
// Variables de la Aplicación //
/*******************************************************************************************************/
exports.appHost = process.env.APP_CM_HOST || ""; // Host de la Aplicación
exports.appName = process.env.APP_CM_NAME || ""; // Nombre de la Aplicación
exports.appAutor = process.env.APP_CM_AUTHOR || ""; // Autor de la Aplicación
exports.appPort = process.env.APP_CM_PORT || 3000; // Puerto de la Aplicación
exports.appSecret = process.env.APP_CM_SECRET_TEXT || ""; // Texto secreto de la Aplicación

/*******************************************************************************************************/
// Variables de la Base de Datos //
/*******************************************************************************************************/
exports.dbHost = process.env.APP_CM_DB_HOST || ""; // Host de la Base de Datos
exports.dbDriver = process.env.APP_CM_DB_DRIV || ""; // Driver de la Base de Datos
exports.dbPort = process.env.APP_CM_DB_PORT || 27017; // Puerto de la Base de Datos
exports.dbName = process.env.APP_CM_DB_NAME || ""; // Nombre de la Base de Datos
exports.dbUser = process.env.APP_CM_DB_USER || ""; // Usuario de la Base de Datos
exports.dbPwd = process.env.APP_CM_DB_PWD || ""; // Contraseña de la Base de Datos

/*******************************************************************************************************/
// Variables Generales de la Aplicación //
/*******************************************************************************************************/
exports.tokenTime = "5d"; // Tiempo de expiración de los jsonwebtokens generados en login
