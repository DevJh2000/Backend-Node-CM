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
    usuario: {
      ref: "AdminUsuario",
      type: ObjectId,
      unique: true,
      required: true,
    },
    dispositivo: String,
    navegador: String,
    estado: {
      type: String,
      enum: ["online", "busy", "offline"],
      default: "online",
      required: true,
    },
  },
  {
    collection: "admin.sesiones",
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
module.exports = model("AdminSesion", schema);
