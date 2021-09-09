CREATE USER me;
CREATE DATABASE api;
GRANT ALL PRIVILEGES ON DATABASE api TO me;
\c api 
CREATE TABLE TBL_USUARIO(
    id_usuario VARCHAR(50) PRIMARY KEY, 
    nombre_usuario VARCHAR(50), 
    cedula_usuario VARCHAR(10), 
    telefono_usuario VARCHAR(10), 
    mail_usuario VARCHAR(50)
);
INSERT INTO TBL_USUARIO (id_usuario, nombre_usuario,cedula_usuario,telefono_usuario,mail_usuario)
  VALUES ('23df34', 'Erick','1725609869', '0960093600','edriick1@gmail.com');
