/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const bcrypt = require("bcryptjs");

/*******************************************************************************************************/
// Función para encriptar cualquier cadena de texto //
/*******************************************************************************************************/
const encrypt = async (cadena) => {
  try {
    // Número de veces que aplicamos el algoritmo de hash
    const n = 10;
    // Generamos el Salt con el número de veces de encriptación
    const salt = await bcrypt.genSalt(n);
    // Covertimos la cadena de texto a un código de texto encriptado
    const encrypted = await bcrypt.hash(cadena, salt);
    return encrypted;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/*******************************************************************************************************/
// Exportamos la función //
/*******************************************************************************************************/
module.exports = encrypt;
