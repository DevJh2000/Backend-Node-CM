/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/*******************************************************************************************************/
// Creamos el esquema y definimos los nombres y tipos de datos //
/*******************************************************************************************************/
// Definimos el tipo para los Id's de Objetos
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema(
  {
    trabajador: {
      ref: "RrhhTrabajador",
      type: ObjectId,
      unique: true,
      required: [true, "El trabajador es requerido"]
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener mínimo 6 dígitos"]
    },
    rol: {
      ref: "AdminRoles",
      type: ObjectId,
      required: [true, "El rol del usuario es requerido"]
    }
  },
  {
    collection: "admin.usuarios",
    timestamps: true,
    versionKey: false,
  }
);

/*******************************************************************************************************/
// Validamos los campos que son únicos, con un mensaje personalizado //
/*******************************************************************************************************/
schema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

/*******************************************************************************************************/
// Exportamos el modelo de datos //
/*******************************************************************************************************/
module.exports = model("AdminUsuario", schema);
