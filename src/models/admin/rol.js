/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/*******************************************************************************************************/
// Creamos el esquema y definimos los nombres y tipos de datos //
/*******************************************************************************************************/
const schema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: [true, "El nombre es necesario"],
    },
    descripcion: String,
    permisos: [{ modulo: String, acciones: [String] }],
    estado: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    collection: "admin.roles",
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
module.exports = model("AdminRoles", schema);
