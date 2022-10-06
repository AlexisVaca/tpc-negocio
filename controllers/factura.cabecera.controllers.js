const { db } = require("../cnn");

//consultas

const getCabecera = async (req, res) => {
  const consulta = "select * from cabecera;";
  const respuesta = await db.query(consulta);
  res.json(respuesta);
};

const getCabeceraByCodigo = async (req, res) => {
  const consulta = "select * from cabecera where id_cabecera = $1";
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

const postCabecera = async (req, res) => {
  /* 
    $1 id_cabecera
    $2 cedulacli_cabecera
    $3 fecha_cabecera
    $4 total_cabecera
    $5 subtotal_cabecera
    $6 iva_cabecera
    */
  const consulta =
    "insert into cabecera (cedulacli_cabecera, fecha_cabecera, total_cabecera, subtotal_cabecera, iva_cabecera) values ($1, $2, $3, $4, $5) RETURNING *;";
  const cabecera = req.body;
  try {
    const respuesta = await db.one(consulta, [
      cabecera.cedulacli_cabecera,
      cabecera.fecha_cabecera,
      cabecera.total_cabecera,
      cabecera.subtotal_cabecera,
      cabecera.iva_cabecera,
    ]);
    res.status(201).json({
      message: "cabecera de factura ingresado correctamente",
      body: respuesta,
    });
  } catch (error) {
    res.status(400).json({
      code: error.code,
      message: error.message,
    });
  }
};

const putCabecera = async (req, res) => {
  const consulta =
    "update cabecera set cedulacli_cabecera = $2, fecha_cabecera = $3, total_cabecera = $4, subtotal_cabecera = $5, iva_cabecera = $6 where id_cabecera = $1 RETURNING *;";
  const cabecera = req.body;
  try {
    const respuesta = await db.one(consulta, [
        cabecera.id_cabecera,
        cabecera.cedulacli_cabecera,
        cabecera.fecha_cabecera,
        cabecera.total_cabecera,
        cabecera.subtotal_cabecera,
        cabecera.iva_cabecera,
    ]);
    res.status(200).json({
      message: "cabecera de factura editado correctamente",
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

const deleteCabecera = async (req, res) => {
  const consulta = "delete from cabecera where id_cabecera = $1 RETURNING *";
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
  getCabecera,
  postCabecera,
  getCabeceraByCodigo,
  putCabecera,
  deleteCabecera
};
