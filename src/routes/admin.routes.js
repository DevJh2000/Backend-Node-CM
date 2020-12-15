/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const { Router } = require("express");
const { validarToken, validarRol } = require("../middlewares/autenticacion");
const modulo = require("../controllers/admin/modulo.controller");
const accion = require("../controllers/admin/accion.controller");
const rol = require("../controllers/admin/rol.controller");
const usuario = require("../controllers/admin/usuario.controller");
const sesion = require("../controllers/admin/sesion.controller");
const auth = require("../controllers/admin/auth.controller");

/*******************************************************************************************************/
// Instanciamos router //
/*******************************************************************************************************/
const router = Router();

/*******************************************************************************************************/
// Definimos las rutas //
/*******************************************************************************************************/
// Módulos
router.get("/modulos", [validarToken, validarRol], modulo.getAll);
router.post("/modulo", [validarToken, validarRol], modulo.create);
router.get("/modulo/:id", [validarToken, validarRol], modulo.get);
router.put("/modulo/:id", [validarToken, validarRol], modulo.update);
router.delete("/modulo/:id", [validarToken, validarRol], modulo.delete);
// Acciones
router.get("/acciones", [validarToken, validarRol], accion.getAll);
router.post("/accion", [validarToken, validarRol], accion.create);
router.get("/accion/:id", [validarToken, validarRol], accion.get);
router.put("/accion/:id", [validarToken, validarRol], accion.update);
router.delete("/accion/:id", [validarToken, validarRol], accion.delete);
// Roles
router.get("/roles", [validarToken, validarRol], rol.getAll);
router.post("/rol", [validarToken, validarRol], rol.create);
router.get("/rol/:id", [validarToken, validarRol], rol.get);
router.put("/rol/:id", [validarToken, validarRol], rol.update);
router.delete("/rol/:id", [validarToken, validarRol], rol.delete);
// Usuarios
router.get("/usuarios", [validarToken, validarRol], usuario.getAll);
router.post("/usuario", [validarToken, validarRol], usuario.create);
router.get("/usuario/:id", [validarToken, validarRol], usuario.get);
router.put("/usuario/:id", [validarToken, validarRol], usuario.update);
router.delete("/usuario/:id", [validarToken, validarRol], usuario.delete);
// Sesiones
router.get("/sesiones", [validarToken, validarRol], sesion.getAll);
router.post("/sesion", [validarToken, validarRol], sesion.create);
router.get("/sesion/:id", [validarToken, validarRol], sesion.get);
router.put("/sesion/:id", [validarToken, validarRol], sesion.update);
router.delete("/sesion/:id", [validarToken, validarRol], sesion.delete);
// Autenticaciones
router.post("/login", auth.login);

/*******************************************************************************************************/
// Exportamos las rutas definidas en router //
/*******************************************************************************************************/
module.exports = router;
