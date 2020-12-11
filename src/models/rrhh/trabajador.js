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
    nombres: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    apellidos: {
      type: String,
      required: [true, "Los apellidos son requeridos"],
    },
    dni: {
      type: String,
      unique: true,
      required: [true, "El DNI es requerido"],
      minlength: [8, "El DNI debe tener 8 dígitos"],
      maxlength: [8, "El DNI debe tener 8 dígitos"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "El correo electrónico es requerido"],
    },
    telefono_movil: {
      type: String,
      required: [true, "El teléfono móvil es requerido"],
      minlength: [9, "El DNI debe tener 9 dígitos"],
      maxlength: [9, "El DNI debe tener 9 dígitos"],
    },
    telefono_fijo: String,
    direccion: String,
    fecha_nacimiento: {
      type: Date,
      required: [true, "La fecha de nacimiento es requerida"],
    },
    ubigeo: {
      departamento: {
        codigo: String,
        nombre: String,
      },
      provincia: {
        codigo: String,
        nombre: String,
      },
      distrito: {
        codigo: String,
        nombre: String,
      },
    },
    regimen_laboral: String,
    img: String,
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
  },
  {
    collection: "rrhh.trabajadores",
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
module.exports = model("RrhhTrabajdor", schema);
