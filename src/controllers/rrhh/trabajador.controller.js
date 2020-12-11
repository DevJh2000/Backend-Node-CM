/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const Trabajador = require("../../models/rrhh/trabajador");

/*******************************************************************************************************/
// Definimos los métodos //
/*******************************************************************************************************/

// Obtener todos los trabajadores
exports.getAll = (req, res) => {
  // Leemos el query de la petición
  const { query } = req;
  const { campos } = query;

  // Realizamos la búsqueda de todos los trabajadores
  Trabajador.find({}, campos).exec((err, trabajadores) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos la lista de trabajadores
    res.json({
      status: true,
      trabajadores: trabajadores,
      registros: trabajadores.length,
    });
  });
};

// Crear un nuevo trabajador
exports.create = (req, res) => {
  // Leemos el body de la petición
  const { body } = req;

  // Creamos el modelo del nuevo trabajador
  const newTrabajador = new Trabajador({
    nombres: body.nombres,
    apellidos: body.apellidos,
    dni: body.dni,
    email: body.email,
    telefono_movil: body.telefono_movil,
    fecha_nacimiento: body.fecha_nacimiento,
  });

  // Guardamos el nuevo trabajador
  newTrabajador.save((err, trabajador) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del usuario guardado
    res.json({
      status: true,
      trabajador: trabajador,
    });
  });
};

// Obtener datos de un trabajador
exports.get = (req, res) => {
  // Leemos los parámetros y el query de la petición
  const { params, query } = req;
  const { id } = params;
  const { campos } = query;

  // Realizamos la búsqueda por id
  Trabajador.findById(id, campos).exec((err, trabajador) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del usuario encontrado
    res.json({
      status: true,
      trabajador: trabajador,
    });
  });
};

// Actualizar los datos de un trabajador
exports.update = (req, res) => {
  // Leemos los parámetros y el body de la petición
  const { params, body } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y actualizamos
  Trabajador.findByIdAndUpdate(id, { $set: body }, { new: true }).exec(
    (err, trabajador) => {
      if (err) {
        return res.status(400).json({
          status: false,
          error: err,
        });
      }

      // Devolvemos los datos actualizados del trabajador
      res.json({
        status: true,
        trabajador: trabajador,
      });
    }
  );
};

// Eliminar un trabajador
exports.delete = (req, res) => {
  // Leemos los parámetros de la petición
  const { params } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y eliminamos
  Trabajador.findByIdAndDelete(id).exec((err, trabajador) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del trabajador eliminado
    res.json({
      status: true,
      trabajador: trabajador,
    });
  });
};
