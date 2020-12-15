/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const Accion = require("../../models/admin/accion");

/*******************************************************************************************************/
// Definimos los métodos //
/*******************************************************************************************************/

// Obtener todas las acciones
exports.getAll = (req, res) => {
  // Leemos el query de la petición
  const { query } = req;
  const { campos } = query;

  // Realizamos la búsqueda de todas las acciones
  Accion.find({}, campos).exec((err, acciones) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos la lista de acciones
    res.json({
      status: true,
      acciones: acciones,
      registros: acciones.length,
    });
  });
};

// Crear una nueva accion
exports.create = (req, res) => {
  // Leemos el body de la petición
  const { body } = req;

  // Creamos el modelo de la nueva accion
  const newAccion = new Accion({
    nombre: body.nombre,
    descripcion: body.descripcion
  });

  // Guardamos el nuevo accion
  newAccion.save((err, accion) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos de la accion guardada
    res.json({
      status: true,
      accion: accion,
    });
  });
};

// Obtener datos de una accion
exports.get = (req, res) => {
  // Leemos los parámetros y el query de la petición
  const { params, query } = req;
  const { id } = params;
  const { campos } = query;

  // Realizamos la búsqueda por id
  Accion.findById(id, campos).exec((err, accion) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos de la accion encontrada
    res.json({
      status: true,
      accion: accion,
    });
  });
};

// Actualizar los datos de una accion
exports.update = (req, res) => {
  // Leemos los parámetros y el body de la petición
  const { params, body } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y actualizamos
  Accion.findByIdAndUpdate(id, { $set: body }, { new: true }).exec(
    (err, accion) => {
      if (err) {
        return res.status(400).json({
          status: false,
          error: err,
        });
      }

      // Devolvemos los datos actualizados de la accion
      res.json({
        status: true,
        accion: accion,
      });
    }
  );
};

// Eliminar una accion
exports.delete = (req, res) => {
  // Leemos los parámetros de la petición
  const { params } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y eliminamos
  Accion.findByIdAndDelete(id).exec((err, accion) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos de la accion eliminada
    res.json({
      status: true,
      accion: accion,
    });
  });
};
