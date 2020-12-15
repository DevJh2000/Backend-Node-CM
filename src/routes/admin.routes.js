/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const { Router } = require("express");
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
router.get("/modulos", modulo.getAll);
router.post("/modulo", modulo.create);
router.get("/modulo/:id", modulo.get);
router.put("/modulo/:id", modulo.update);
router.delete("/modulo/:id", modulo.delete);
// Acciones
router.get("/acciones", accion.getAll);
router.post("/accion", accion.create);
router.get("/accion/:id", accion.get);
router.put("/accion/:id", accion.update);
router.delete("/accion/:id", accion.delete);
// Roles
router.get("/roles", rol.getAll);
router.post("/rol", rol.create);
router.get("/rol/:id", rol.get);
router.put("/rol/:id", rol.update);
router.delete("/rol/:id", rol.delete);
// Usuarios
router.get("/usuarios", usuario.getAll);
router.post("/usuario", usuario.create);
router.get("/usuario/:id", usuario.get);
router.put("/usuario/:id", usuario.update);
router.delete("/usuario/:id", usuario.delete);
// Sesiones
router.get("/sesiones", sesion.getAll);
router.post("/sesion", sesion.create);
router.get("/sesion/:id", sesion.get);
router.put("/sesion/:id", sesion.update);
router.delete("/sesion/:id", sesion.delete);
// Autenticaciones
router.post("/login", auth.login);

/*******************************************************************************************************/
// Exportamos las rutas definidas en router //
/*******************************************************************************************************/
module.exports = router;
