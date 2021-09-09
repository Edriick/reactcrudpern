const express = require("express");
const app = express();
const cors = require("cors");

//conexion
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "pern_db",
  password: "root",
  host: "db",
  port: 5432,
  database: "api"
});

app.use(cors());
app.use(express.json());

//Ingresar Usuario
app.post("/usuario", async (req, res) => {
  try {
    const { id_usuario } = req.body;
    const { nombre_usuario } = req.body;
    const { cedula_usuario } = req.body;
    const { telefono_usuario } = req.body;
    const { mail_usuario } = req.body;
    const newUsuario = await pool.query(
      "INSERT INTO TBL_USUARIO (id_usuario,nombre_usuario,cedula_usuario,telefono_usuario,mail_usuario) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [
        id_usuario,
        nombre_usuario,
        cedula_usuario,
        telefono_usuario,
        mail_usuario,
      ]
    );
    res.json(newUsuario.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Obtener Todos los Usuarios
app.get("/usuario", async (req, res) => {
  try {
    const allUsuarios = await pool.query(`SELECT * FROM TBL_USUARIO`);
    res.json(allUsuarios.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Obtener 1 usuario por ID
app.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await pool.query(
      "SELECT * FROM TBL_USUARIO WHERE id_usuario = $1",
      [id]
    );

    res.json(usuario.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Editar Usuario
app.put("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const { id } = req.body;
    const { nombre_usuario } = req.body;
    const { cedula_usuario } = req.body;
    const { telefono_usuario } = req.body;
    const { mail_usuario } = req.body;
    const updateUsuario = await pool.query(
      "UPDATE TBL_USUARIO SET nombre_usuario = $1,cedula_usuario = $2,telefono_usuario = $3,mail_usuario = $4 WHERE id_usuario = $5",
      [nombre_usuario, cedula_usuario, telefono_usuario, mail_usuario, id]
    );

    res.json("Se actualizo correctamente!");
  } catch (err) {
    console.error(err.message);
  }
});

//Eliminar usuario
app.delete("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUsuario = await pool.query(
      "DELETE FROM TBL_USUARIO WHERE id_usuario = $1",
      [id]
    );
    res.json("Se elimino correctamente!");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
