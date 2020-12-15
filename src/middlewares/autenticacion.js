/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const jwt = require("jsonwebtoken");
const Rol = require("../models/admin/rol");
const { appSecret } = require("../config/config");

/*******************************************************************************************************/
// Validamos y decodificamps el jsonwebtoken en la petición  //
/*******************************************************************************************************/
exports.validarToken = (req, res, next) => {
  // Leemos los headers de la petición
  const { headers } = req;
  const { token } = headers;

  // Si no rxiste token
  if (!token) {
    return res.status(400).json({
      status: false,
      error: "Se debe proporcionar un token",
    });
  }

  // Verificamos el token enviado con el texto secreto de la aplicación
  jwt.verify(token, appSecret, (err, decoded) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(400).json({
          status: false,
          error: "El token proporcionado es inválido",
        });
      }
      if (err.name === "TokenExpiredError") {
        return res.status(400).json({
          status: false,
          error: "El token proporcionado ha expirado",
          expirado: err.expiredAt,
        });
      }
    }
    // Almacenamos los datos del usuario en el request
    req.usuario = decoded.usuario;
    next();
  });
};

/*******************************************************************************************************/
// Verificamos y validamos el ROL del usuario  //
/*******************************************************************************************************/
exports.validarRol = (req, res, next) => {
  // Obtener los datos del usuario
  const usuario = req.usuario;

  // Obtenemos el ROL del usuario
  const rol = usuario.rol;

  // Obtenemos la ruta y módulo que consulta el usuario
  const path = req.originalUrl;
  const modulo = path.split("/")[1];

  Rol.findOne({ _id: rol }).exec(async (err, rol) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }
    const permiso = await rol.permisos.filter((ele) => {
      return ele.modulo === modulo;
    });
    if (permiso.length === 0) {
      return res.status(400).json({
        status: false,
        error: "Usted no cuenta con autorización para esta ruta",
      });
    }
    next();
  });
};
