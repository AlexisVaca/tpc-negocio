// Importaciones
const { Router } = require("express")
const { getProductos, postProducto, getProductoByCodigo, putProducto, deleteProducto } = require("../controllers/productos.controllers")
const { getCabecera, postCabecera, getCabeceraByCodigo, putCabecera, deleteCabecera } = require("../controllers/factura.cabecera.controllers")
const { getDetalle, postDetalle, getDetalleByCodigo, putDetalle, deleteDetalle } = require("../controllers/factura.detalle.controllers")
const router = Router()

//Rutas productos
router.get("/productos", getProductos)
router.get("/productos/:codigo", getProductoByCodigo)
router.post("/productos", postProducto)
router.put("/productos", putProducto)
router.delete("/productos/:codigo", deleteProducto)

//Rutas cabecera
router.get("/factura/cabecera", getCabecera)
router.get("/factura/cabecera/:codigo", getCabeceraByCodigo)
router.post("/factura/cabecera", postCabecera)
router.put("/factura/cabecera", putCabecera)
router.delete("/factura/cabecera/:codigo", deleteCabecera)

//Rutas detalles
router.get("/factura/detalle", getDetalle)
router.get("/factura/detalle/:codigo", getDetalleByCodigo)
router.post("/factura/detalle", postDetalle)
router.put("/factura/detalle", putDetalle)
router.delete("/factura/detalle/:codigo", deleteDetalle)

module.exports = router