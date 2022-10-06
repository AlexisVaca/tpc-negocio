const { db } = require("../cnn");

//consultas

const getProductos = async (req, res) => {
  const consulta = "select * from producto;";
  const respuesta = await db.query(consulta);
  res.json(respuesta);
};

const getProductoByCodigo = async (req, res) => {
  const consulta = "select * from producto where codigo_producto like $1";
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

const postProducto = async (req, res) => {
  /* 
    $1 codigo_producto
    $2 nombre_producto
    $3 precio_producto
    $4 img_producto
    $5 stock_producto
    $6 minimo_producto
    */
  const consulta =
    "insert into producto values ($1, $2, $3, $4, $5, $6) RETURNING *;";
  const producto = req.body;
  try {
    const respuesta = await db.one(consulta, [
      producto.codigo_producto,
      producto.nombre_producto,
      producto.precio_producto,
      producto.img_producto,
      producto.stock_producto,
      producto.minimo_producto,
    ]);
    res.status(201).json({
      message: "producto ingresado correctamente",
      body: respuesta,
    });
  } catch (error) {
    res.status(400).json({
      code: error.code,
      message: error.message,
    });
  }
};

const putProducto = async (req, res) => {
  const consulta =
    "update producto set nombre_producto = $2, precio_producto = $3, img_producto = $4, stock_producto = $5, minimo_producto = $6 where codigo_producto = $1 RETURNING *;";
  const producto = req.body;
  try {
    const respuesta = await db.one(consulta, [
      producto.codigo_producto,
      producto.nombre_producto,
      producto.precio_producto,
      producto.img_producto,
      producto.stock_producto,
      producto.minimo_producto
    ]);
    res.status(200).json({
      message: "producto editado correctamente",
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

const deleteProducto = async (req, res) => {
  const consulta = "delete from producto where codigo_producto like $1 RETURNING *";
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
  getProductos,
  postProducto,
  getProductoByCodigo,
  putProducto,
  deleteProducto
};
