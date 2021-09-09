import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import Swal from "sweetalert2";

function App() {
  //arreglo usuarios
  const [usuarios, setUsuarios] = useState([]);

  const [idActual, setIdActual] = useState("");

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});

  useEffect(() => {
    if (idActual !== "") {
      obtenerUsuarioId(idActual);
    }
  }, [idActual]);

  //Obtener Usuario por ID
  const obtenerUsuarioId = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/usuario/${id}`);
      const jsonData = await response.json();
      setUsuarioSeleccionado(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Agrega nuevo usuario
  const crearUsuario = async (usuario) => {
    try {
      const body = usuario;
      console.log(usuario);
      await fetch("http://localhost:3000/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });      
      Swal.fire("Correcto", "El usuario se agregó correctamente", "success");
      
    } catch (err) {
      console.error(err.message);      
      //alerta error      
      Swal.fire({
        icon: "error",
        title: " Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };

  //Eliminar Usuario
  const eliminarUsuario = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un usuario que se elimina no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar(id);
      }
    });
  };
  const eliminar = async (id) => {
    try {
      await fetch(`http://localhost:3000/usuario/${id}`, {
        method: "DELETE",
      });

      setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id));
      Swal.fire(
        "Eliminado!",
        "El producto se elimino correctamente.",
        "success"
      );
    } catch (err) {
      console.error(err.message);
      //alerta error
      Swal.fire({
        icon: "error",
        title: " Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };

  //Obtener Usuario
  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3000/usuario");
      const jsonData = await response.json();

      setUsuarios(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  //editar
  const editarUsuario = async (usuario) => {
    try {
      const body = usuario;
      await fetch(`http://localhost:3000/usuario/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      Swal.fire("Correcto", "El usuario se edito correctamente", "success");     
    } catch (err) {
      console.error(err.message);
      //alerta error
      Swal.fire({
        icon: "error",
        title: " Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
    setIdActual("");
  };

  return (
    <>
      <h1>Administrador de Usuarios</h1>
      <div className="container">
        <div className="row">
          <div className="four columns">
            <Formulario
              crearUsuario={crearUsuario}
              editarUsuario={editarUsuario}
              idActual={idActual}
              usuarioSeleccionado={usuarioSeleccionado}
            />
          </div>
          <div className="six columns">
            <h2 className="text-center">Listado de tus usuarios</h2>
            <Listado
              eliminarUsuario={eliminarUsuario}
              obtenerUsuarios={obtenerUsuarios}
              setIdActual={setIdActual}
              usuarios={usuarios}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
