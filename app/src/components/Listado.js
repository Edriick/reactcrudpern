import React, { useEffect } from "react";

const Listado = ({
  obtenerUsuarios,
  eliminarUsuario,
  usuarios,
  setIdActual,
}) => {
  
  useEffect(() => {
    obtenerUsuarios();
  }, [obtenerUsuarios]);

  return (
    <>
      <table className="u-full-width">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Cédula</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Mail</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => {
            return (
              <tr key={user.id_usuario}>
                <td>{user.nombre_usuario}</td>
                <td>{user.cedula_usuario}</td>
                <td>{user.telefono_usuario}</td>
                <td>{user.mail_usuario}</td>
                <td>
                  <i
                    className="material-icons"
                    onClick={() => setIdActual(user.id_usuario)}
                  >
                    create
                  </i>
                </td>
                <td>
                  <i
                    className="material-icons text-danger"
                    onClick={() => eliminarUsuario(user.id_usuario)}
                  >
                    close
                  </i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Listado;
