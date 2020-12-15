/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const Sesion = require("../../models/admin/sesion");

/*******************************************************************************************************/
// Definimos los métodos //
/*******************************************************************************************************/

// Obtener todas las sesiones
exports.getAll = (req, res) => {
  // Leemos el query de la petición
  const { query } = req;
  const { campos } = query;

  // Realizamos la búsqueda de todas las sesiones
  Sesion.find({}, campos).exec((err, sesiones) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos la lista de sesiones
    res.json({
      status: true,
      sesiones: sesiones,
      registros: sesiones.length,
    });
  });
};

// Crear una nueva sesion
exports.create = (req, res) => {
  // Leemos el body de la petición
  const { body } = req;

  // Creamos el modelo de la nueva sesion
  const newSesion = new Sesion({
    usuario: body.usuario,
    dispositivo: body.dispositivo,
    navegador: body.navegador,
  });

  // Guardamos la nueva sesion
  newSesion.save((err, sesion) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos de la sesion guardada
    res.json({
      status: true,
      sesion: sesion,
    });
  });
};

// Obtener datos de una sesion
exports.get = (req, res) => {
  // Leemos los parámetros y el query de la petición
  const { params, query } = req;
  const { id } = params;
  const { campos } = query;

  // Realizamos la búsqueda por id
  Sesion.findById(id, campos).exec((err, sesion) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos de la sesion encontrada
    res.json({
      status: true,
      sesion: sesion,
    });
  });
};

// Actualizar los datos de una sesion
exports.update = (req, res) => {
  // Leemos los parámetros y el body de la petición
  const { params, body } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y actualizamos
  Sesion.findByIdAndUpdate(id, { $set: body }, { new: true }).exec(
    (err, sesion) => {
      if (err) {
        return res.status(400).json({
          status: false,
          error: err,
        });
      }

      // Devolvemos los datos actualizados de la sesion
      res.json({
        status: true,
        sesion: sesion,
      });
    }
  );
};

// Eliminar una sesion
exports.delete = (req, res) => {
  // Leemos los parámetros de la petición
  const { params } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y eliminamos
  Sesion.findByIdAndDelete(id).exec((err, sesion) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos de la sesion eliminada
    res.json({
      status: true,
      sesion: sesion,
    });
  });
};
