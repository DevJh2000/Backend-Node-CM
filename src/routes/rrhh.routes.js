/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const { Router } = require("express");
const { validarToken, validarRol } = require("../middlewares/autenticacion");
const trabajador = require("../controllers/rrhh/trabajador.controller");

/*******************************************************************************************************/
// Instanciamos router //
/*******************************************************************************************************/
const router = Router();

/*******************************************************************************************************/
// Definimos las rutas //
/*******************************************************************************************************/
router.get("/trabajadores", [validarToken, validarRol], trabajador.getAll);
router.post("/trabajador", [validarToken, validarRol], trabajador.create);
router.get("/trabajador/:id", [validarToken, validarRol], trabajador.get);
router.put("/trabajador/:id", [validarToken, validarRol], trabajador.update);
router.delete("/trabajador/:id", [validarToken, validarRol], trabajador.delete);

/*******************************************************************************************************/
// Exportamos las rutas definidas en router //
/*******************************************************************************************************/
module.exports = router;
