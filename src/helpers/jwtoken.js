/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const jwt = require("jsonwebtoken");
const { appSecret } = require("../config/config");

/*******************************************************************************************************/
// Función para generar un jsonwebtoken indefinido (que nunca expira) //
/*******************************************************************************************************/
exports.generarToken = (object) => {
  try {
    // Creamos el jwtoken firmando con el payload y el texto secreto
    const token = jwt.sign(
      object, // payload o datos del cuerpo
      appSecret // texto secreto de la aplicación
    );
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/*******************************************************************************************************/
// Función para generar un jsonwebtoken que expira en un tiempo determinado //
/*******************************************************************************************************/
exports.generarTokenConTiempo = (object, time) => {
  try {
    // Creamos el jwtoken firmando con el payload y el texto secreto
    const token = jwt.sign(
      object, // payload o datos del cuerpo
      appSecret, // texto secreto de la aplicación
      {
          expiresIn: time, // Tiempo en el que expira el token (en segundos o un string)
          /* Ejemplos ==> {
            time: 30  (30 segundos)
            time: "120"  (120 milisegundos)
            time: "10d"  (10 días)
            time: "2h"  (2 horas)
            time: "2 days"  (2 dias)
          } */
      }
    );
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
