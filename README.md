## Video Prueba
[https://youtu.be/kpCdFfyXG0E](https://youtu.be/kpCdFfyXG0E)

## Información

El frontend se encuentra en el puerto 8000
[http://localhost:8000](http://localhost:8000)

El backend se encuentra en el puerto 3000
[http://localhost:3000](http://localhost:3000)

El PgAdmin4 se encuentra en el puerto 5050
[http://localhost:5050](http://localhost:5050)

La base de datos corre en el puerto 5432

### Dependencias
- [Docker](https://docs.docker.com/get-docker/)
- [Node.JS / NPM](https://nodejs.org/en/download/)

### Comandos

Inicia contenedores y redes de Docker

```
docker-compose up
```
Detiene contenedores y redes de Docker

```
docker-compose down
```

### Acceso a PgAdmin4

- **URL:** [http://localhost:5050](http://localhost:5050)
- **Username:** `pgadmin4@pgadmin.org`
- **Password:** `admin`

#### Añadir un Nuevo servidor en PgAdmin4

- **Host name/address** `db`
- **Port** `5432`
- **Username** `pern_db`
- **Password** `root`

