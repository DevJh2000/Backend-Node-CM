/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const bcrypt = require("bcryptjs");
const Usuario = require("../../models/admin/usuario");
const Sesion = require("../../models/admin/sesion");
const Trabajador = require("../../models/rrhh/trabajador");
const { generarTokenConTiempo } = require("../../helpers/jwtoken");
const { tokenTime } = require("../../config/config");

/*******************************************************************************************************/
// Definimos los métodos //
/*******************************************************************************************************/

// Autenticamos el inicio de sesión de un usuario
exports.login = (req, res) => {
  // Leemos el body de la petición
  const { body } = req;

  // Realizamos la búsqueda del trababajador por el DNI
  Trabajador.findOne({ dni: body.username }).exec((errT, trabajador) => {
    // Si existe un error devolvemos con el mensaje correspondiente
    if (errT) {
      return res.status(500).json({
        status: false,
        error: errT,
      });
    }

    // Verificamos si el trabajador existe
    if (!trabajador) {
      return res.status(400).json({
        status: false,
        msg: "El usuario no existe",
      });
    }

    // Verificamos si el trabajador está habilitado
    if (!trabajador.estado) {
      return res.status(400).json({
        status: false,
        msg: "El usuario está desactivado",
      });
    }

    // Realizamos la búsqueda del usuario por el ID del trabajador
    Usuario.findOne({ trabajador: trabajador._id }).exec(
      async (errU, usuario) => {
        // Si existe un error devolvemos con el mensaje correspondiente
        if (errU) {
          return res.status(500).json({
            status: false,
            error: errU,
          });
        }

        // Comparamos la contraseña
        const isValid = await bcrypt.compare(body.password, usuario.password);
        if (!isValid) {
          return res.status(500).json({
            status: false,
            msg: "La constraseña no es válida",
          });
        }

        // Realizamos la búsqueda en sesión con el id del usuario
        Sesion.findOne({ usuario: usuario._id }).exec((errS, sesion) => {
          if (errS) {
            console.log("Error buscar sesion : " + errS);
          }
          if (sesion) {
            // Realizamos la búsqueda por id y actualizamos
            Sesion.findByIdAndUpdate(
              sesion._id,
              {
                $set: {
                  dispositivo: body.dispositivo,
                  navegador: body.navegador,
                  estado: "online",
                },
              },
              { new: true }
            ).exec((errSU) => {
              if (errSU) {
                console.log("Error actualizando sesión : " + errSU);
              }
            });
          } else {
            const newSesion = new Sesion({
              usuario: usuario._id,
              dispositivo: body.dispositivo,
              navegador: body.navegador,
            });

            // Guardamos la nueva sesion
            newSesion.save((errSC) => {
              if (errSC) {
                console.log("Error creando nueva sesión : " + errSC);
              }
            });
          }
        });

        // Definimos el objeto payload
        const payload = {
          usuario: {
            _id: usuario._id,
            trabajador: trabajador._id,
            rol: usuario.rol,
            nombres: trabajador.nombres,
            apellidos: trabajador.apellidos,
            email: trabajador.email,
            img: trabajador.img,
          },
        };

        // Generamos el token del usuarios
        const token = generarTokenConTiempo(payload, tokenTime);

        // Devolvemos los datos del usuario (trabajador) y el token generado
        res.json({
          status: true,
          usuario: payload.usuario,
          token: token,
        });
      }
    );
  });
};
