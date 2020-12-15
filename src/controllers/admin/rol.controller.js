/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const Rol = require("../../models/admin/rol");

/*******************************************************************************************************/
// Definimos los métodos //
/*******************************************************************************************************/

// Obtener todos los roles
exports.getAll = (req, res) => {
  // Leemos el query de la petición
  const { query } = req;
  const { campos } = query;

  // Realizamos la búsqueda de todos los roles
  Rol.find({}, campos).exec((err, roles) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos la lista de roles
    res.json({
      status: true,
      roles: roles,
      registros: roles.length,
    });
  });
};

// Crear un nuevo rol
exports.create = (req, res) => {
  // Leemos el body de la petición
  const { body } = req;

  // Creamos el modelo del nuevo rol
  const newRol = new Rol({
    nombre: body.nombre,
    descripcion: body.descripcion,
    permisos: body.permisos,
  });

  // Guardamos el nuevo rol
  newRol.save((err, rol) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del rol guardado
    res.json({
      status: true,
      rol: rol,
    });
  });
};

// Obtener datos de un rol
exports.get = (req, res) => {
  // Leemos los parámetros y el query de la petición
  const { params, query } = req;
  const { id } = params;
  const { campos } = query;

  // Realizamos la búsqueda por id
  Rol.findById(id, campos).exec((err, rol) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del rol encontrado
    res.json({
      status: true,
      rol: rol,
    });
  });
};

// Actualizar los datos de un rol
exports.update = (req, res) => {
  // Leemos los parámetros y el body de la petición
  const { params, body } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y actualizamos
  Rol.findByIdAndUpdate(id, { $set: body }, { new: true }).exec((err, rol) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos actualizados del rol
    res.json({
      status: true,
      rol: rol,
    });
  });
};

// Eliminar un rol
exports.delete = (req, res) => {
  // Leemos los parámetros de la petición
  const { params } = req;
  const { id } = params;

  // Realizamos la búsqueda por id y eliminamos
  Rol.findByIdAndDelete(id).exec((err, rol) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err,
      });
    }

    // Devolvemos los datos del rol eliminado
    res.json({
      status: true,
      rol: rol,
    });
  });
};
