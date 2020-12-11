/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const mongoose = require("mongoose");
const { dbDriver, dbHost, dbName, dbUser, dbPwd } = require("../config/config");
require("colors");

/*******************************************************************************************************/
// Creamos la conexión a la Base de Datos MongoDB //
/*******************************************************************************************************/
exports.connection = () => {
  const query = "retryWrites=true&w=majority"; // Opciones de reescritura de la base de datos
  const URI = `${dbDriver}://${dbHost}/${dbName}?${query}`; // URI de acceso a la base de datos

  // Definimos las opciones
  const options = {
    useCreateIndex: true, // Habilitamos para que mongoose pueda crear index por defecto
    useNewUrlParser: true, // Habilitamos para evitar un DeprecationWarning
    useUnifiedTopology: true, // Habilitamos para evitar un DeprecationWarning
    useFindAndModify: false, // Habilitamos para evitar un DeprecationWarning
    user: dbUser, // Pasamos el usuario
    pass: dbPwd, // Pasamos la contraseña
  };

  // Nos conectamos a la base de datos
  mongoose.connect(URI, options, (err) => {
    if(err) {
        console.log("Error en la conexión: ".white.bold);
        console.error(err);
        console.log("*********************************************************".rainbow);
    }      
    console.log(`💽 Conexión exitosa a MongoDB`.green.bold);
    console.log("*********************************************************".rainbow);
  });

};
