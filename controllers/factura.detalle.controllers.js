const { db } = require("../cnn");

//consultas

const getDetalle = async (req, res) => {
  const consulta = "select * from detalle;";
  const respuesta = await db.query(consulta);
  res.json(respuesta);
};

const getDetalleByCodigo = async (req, res) => {
  const consulta = "select * from detalle where id_detalle = $1";
  const codigo = req.params.codigo;
  try {
    const respuesta = await db.one(consulta, [codigo]);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({
      code: error.code,
      message: error.message,
    });
  }
};

const postDetalle = async (req, res) => {
  /* 
    $1 id_detalle
    $2 id_cabecera
    $3 id_producto
    $4 precio_cu_detalle
    $5 precio_total_detalle
    */
  const consulta =
    "insert into detalle (id_cabecera, id_producto, precio_cu_detalle, precio_total_detalle) values ($1, $2, $3, $4) RETURNING *;";
  const detalle = req.body;
  try {
    const respuesta = await db.one(consulta, [
      detalle.id_cabecera,
      detalle.id_producto,
      detalle.precio_cu_detalle,
      detalle.precio_total_detalle,
    ]);
    res.status(201).json({
      message: "detalle de factura ingresado correctamente",
      body: respuesta,
    });
  } catch (error) {
    res.status(400).json({
      code: error.code,
      message: error.message,
    });
  }
};

const putDetalle = async (req, res) => {
  const consulta =
    "update detalle set id_cabecera = $2, id_producto = $3, precio_cu_detalle = $4, precio_total_detalle = $5 where id_detalle = $1 RETURNING *;";
  const detalle = req.body;
  try {
    const respuesta = await db.one(consulta, [
      detalle.id_detalle,
      detalle.id_cabecera,
      detalle.id_producto,
      detalle.precio_cu_detalle,
      detalle.precio_total_detalle,
    ]);
    res.status(200).json({
      message: "detalle de factura editado correctamente",
      body: respuesta,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: error.code,
      message: error.message,
    });
  }
};

const deleteDetalle = async (req, res) => {
  const consulta = "delete from detalle where id_detalle = $1 RETURNING *";
  try {
    const codigo = req.params.codigo;
    const respuesta = await db.one(consulta, [codigo]);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({
      code: error.code,
      message: error.message,
    });
  }
};

module.exports = {
  getDetalle,
  postDetalle,
  getDetalleByCodigo,
  putDetalle,
  deleteDetalle
};
