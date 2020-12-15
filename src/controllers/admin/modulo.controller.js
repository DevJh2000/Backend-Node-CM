/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const Modulo = require("../../models/admin/modulo");

/*******************************************************************************************************/
// Definimos los métodos //
/*******************************************************************************************************/

// Obtener todos los modulos
exports.getAll = (req, res) => {
  // Leemos el query de la petición
  const { query } = req;
  const { campos } = query;

  // Realizamos la búsqueda de todos los modulos
  Modulo.find({}, campos).exec((err, modulos) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos la lista de modulos
    res.json({
      status: true,
      modulos: modulos,
      registros: modulos.length,
    });
  });
};

// Crear un nuevo modulo
exports.create = (req, res) => {
  // Leemos el body de la petición
  const { body } = req;

  // Creamos el modelo del nuevo modulo
  const newModulo = new Modulo({
    nombre: body.nombre,
    tag: body.tag,
    descripcion: body.descripcion
  });

  // Guardamos el nuevo modulo
  newModulo.save((err, modulo) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del modulo guardado
    res.json({
      status: true,
      modulo: modulo,
    });
  });
};

// Obtener datos de un modulo
exports.get = (req, res) => {
  // Leemos los parámetros y el query de la petición
  const { params, query } = req;
  const { id } = params;
  const { campos } = query;

  // Realizamos la búsqueda por id
  Modulo.findById(id, campos).exec((err, modulo) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del modulo encontrado
    res.json({
      status: true,
      modulo: modulo,
    });
  });
};

// Actualizar los datos de un modulo
exports.update = (req, res) => {
  // Leemos los parámetros y el body de la petición
  const { params, body } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y actualizamos
  Modulo.findByIdAndUpdate(id, { $set: body }, { new: true }).exec(
    (err, modulo) => {
      if (err) {
        return res.status(400).json({
          status: false,
          error: err,
        });
      }

      // Devolvemos los datos actualizados del modulo
      res.json({
        status: true,
        modulo: modulo,
      });
    }
  );
};

// Eliminar un modulo
exports.delete = (req, res) => {
  // Leemos los parámetros de la petición
  const { params } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y eliminamos
  Modulo.findByIdAndDelete(id).exec((err, modulo) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del modulo eliminado
    res.json({
      status: true,
      modulo: modulo,
    });
  });
};
