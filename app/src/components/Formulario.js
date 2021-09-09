import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Formulario = ({
  crearUsuario,
  editarUsuario,
  usuarioSeleccionado,
  idActual,
}) => {
  //state inicial
  const [usuario, setUsuario] = useState({
    id_usuario: "",
    nombre_usuario: "",
    cedula_usuario: "",
    telefono_usuario: "",
    mail_usuario: "",
  });
  const [error, actualizarError] = useState("");

  //extraer de usuario
  const { nombre_usuario, cedula_usuario, telefono_usuario, mail_usuario } =
    usuario;

  useEffect(() => {
    if (idActual !== "") setUsuario(usuarioSeleccionado);
  }, [usuarioSeleccionado, idActual]);

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  //cuando el usuario quiere iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault();
    //validar que no haya vacios
    if (
      nombre_usuario.trim() === "" ||
      cedula_usuario.trim() === "" ||
      telefono_usuario.trim() === "" ||
      mail_usuario.trim() === ""
    ) {
      actualizarError("Todos los campos son obligatorios");
      return;
    }
    //validar Nombre
    if (!nombre_usuario) {
      return actualizarError("El nombre es obligatorio");
    } else if (!/^[A-z]{0,}$/i.test(nombre_usuario)) {
      return actualizarError("Nombre no valido");
    }
    //validar CI
    if (!(cedula_usuario.length === 10)) {
      return actualizarError("La cédula debe tener 10 digitos");
    } else if (!validateCi(cedula_usuario))
      return actualizarError("El valor de la cédula es incorrecto");

    //validar 10 numeros en Telefono
    if (!(telefono_usuario.length === 10 || telefono_usuario.length === 7)) {
      return actualizarError("El teléfono debe tener 7 o 10 digitos");
    } else if (!/^[0]{1}[1-9]{2}[0-9]{3,10}$/i.test(telefono_usuario)) {
      return actualizarError("Teléfono no valido");
    }
    //validar el email
    if (!mail_usuario) {
      return actualizarError("El Email es obligatorio");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(mail_usuario)) {
      return actualizarError("Email no valido");
    }
    actualizarError("");
    //registrar en bd
    if (idActual === "") {
      //agregar ID unico
      usuario.id_usuario = uuidv4();
      crearUsuario(usuario);
    } else {
      editarUsuario(usuario);
    }
    //reiniciar form
    setUsuario({
      id_usuario: "",
      nombre_usuario: "",
      cedula_usuario: "",
      telefono_usuario: "",
      mail_usuario: "",
    });
  };

  //validar CI extraido de https://gist.github.com/vickoman/7800717
  const validateCi = (cedula) => {
    if (cedula.length === 10) {
      let digito_region = cedula.substring(0, 2);
      if (digito_region >= 1 && digito_region <= 24) {
        let ultimo_digito = +cedula.substring(9, 10);
        let pares =
          parseInt(cedula.substring(1, 2)) +
          parseInt(cedula.substring(3, 4)) +
          parseInt(cedula.substring(5, 6)) +
          parseInt(cedula.substring(7, 8));
        let numero1 = cedula.substring(0, 1);
        numero1 = numero1 * 2;
        if (numero1 > 9) {
          numero1 = numero1 - 9;
        }
        let numero3 = cedula.substring(2, 3);
        numero3 = numero3 * 2;
        if (numero3 > 9) {
          numero3 = numero3 - 9;
        }
        let numero5 = cedula.substring(4, 5);
        numero5 = numero5 * 2;
        if (numero5 > 9) {
          numero5 = numero5 - 9;
        }
        let numero7 = cedula.substring(6, 7);
        numero7 = numero7 * 2;
        if (numero7 > 9) {
          numero7 = numero7 - 9;
        }
        let numero9 = cedula.substring(8, 9);
        numero9 = numero9 * 2;
        if (numero9 > 9) {
          numero9 = numero9 - 9;
        }
        let impares = numero1 + numero3 + numero5 + numero7 + numero9;
        let suma_total = pares + impares;
        let primer_digito_suma = String(suma_total).substring(0, 1);
        let decena = (parseInt(primer_digito_suma) + 1) * 10;
        let digito_validador = decena - suma_total;
        if (digito_validador === 10) digito_validador = 0;
        if (digito_validador === ultimo_digito) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Crear Usuario</h1>
        {error ? <p className="alerta-error">{error}</p> : null}
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            className="u-full-width"
            placeholder="Nombre del usuario"
            value={nombre_usuario}
            name="nombre_usuario"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Cédula</label>
          <input
            type="text"
            className="u-full-width"
            placeholder="Cédula de identidad"
            value={cedula_usuario}
            name="cedula_usuario"
            min="10"
            max="10"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            className="u-full-width"
            min="7"
            max="10"
            placeholder="Número de celular"
            value={telefono_usuario}
            name="telefono_usuario"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="u-full-width"
            placeholder="Correo electronico"
            value={mail_usuario}
            name="mail_usuario"
            onChange={onChange}
          />
        </div>

        <button className="u-full-width button-primary">
          {idActual === "" ? "Guardar Nuevo" : "Editar"}
        </button>
      </form>
    </>
  );
};

export default Formulario;
