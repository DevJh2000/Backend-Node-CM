/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const Usuario = require("../../models/admin/usuario");
const encrypt = require("../../helpers/encrypt");

/*******************************************************************************************************/
// Definimos los métodos //
/*******************************************************************************************************/

// Obtener todos los usuarios
exports.getAll = (req, res) => {
  // Leemos el query de la petición
  const { query } = req;
  const { campos } = query;

  // Realizamos la búsqueda de todos los usuarios
  Usuario.find({}, campos).exec((err, usuarios) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos la lista de usuarios
    res.json({
      status: true,
      usuarios: usuarios,
      registros: usuarios.length,
    });
  });
};

// Crear un nuevo usuario
exports.create = async (req, res) => {
  // Leemos el body de la petición
  const { body } = req;

  // Encriptamos la contraseña antes de guardarla
  const pwdCrypted = await encrypt(body.password);

  // Creamos el modelo del nuevo usuario
  const newUsuario = new Usuario({
    trabajador: body.trabajador,
    password: pwdCrypted,
    rol: body.rol,
  });

  // Guardamos el nuevo usuario
  newUsuario.save((err, usuario) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del usuario guardado
    res.json({
      status: true,
      usuario: usuario,
    });
  });
};

// Obtener datos de un usuario
exports.get = (req, res) => {
  // Leemos los parámetros y el query de la petición
  const { params, query } = req;
  const { id } = params;
  const { campos } = query;

  // Realizamos la búsqueda por id
  Usuario.findById(id, campos).exec((err, usuario) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del usuario encontrado
    res.json({
      status: true,
      usuario: usuario,
    });
  });
};

// Actualizar los datos de un usuario
exports.update = async (req, res) => {
  // Leemos los parámetros y el body de la petición
  const { params, body } = req;
  const { id } = params;

  if (body.password) {
    // Encriptamos la contraseña antes de actualizarla
    const pwdCrypted = await encrypt(body.password);
    body.password = pwdCrypted;
  }

  // Realizamos la búsqueda por id y actualizamos
  Usuario.findByIdAndUpdate(id, { $set: body }, { new: true }).exec(
    (err, usuario) => {
      if (err) {
        return res.status(400).json({
          status: false,
          error: err,
        });
      }

      // Devolvemos los datos actualizados del usuario
      res.json({
        status: true,
        usuario: usuario,
      });
    }
  );
};

// Eliminar un usuario
exports.delete = (req, res) => {
  // Leemos los parámetros de la petición
  const { params } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y eliminamos
  Usuario.findByIdAndDelete(id).exec((err, usuario) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del usuario eliminado
    res.json({
      status: true,
      usuario: usuario,
    });
  });
};
