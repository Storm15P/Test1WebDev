'use strict'


const peliculas = require('../models/peliculas');
var Peliculas = require('../models/peliculas');



///////////////////////////////////////////Para consultar todas las peliculas, se pone el token del admin y se consulta mediante get, tocó usar async para el manejo de erroes.
async function obtenerPeliculas(req, res) {
    try {
        // Buscar todas las películas en la base de datos
        const peliculasEncontradas = await peliculas.find({});

        // Si no se encuentran películas, enviar un mensaje de error
        if (!peliculasEncontradas || peliculasEncontradas.length === 0) {
            return res.status(404).send({ message: 'No se encontraron películas.' });
        }

        // Devolver la lista de películas
        res.status(200).send({ peliculas: peliculasEncontradas });
    } catch (err) {
        console.error(err); // Para depuración
        res.status(500).send({ message: 'Error al obtener las películas.' });
    }
}



///////////////////////////////////////////para agregarpeliculas, claramenta solo para admin
function agregarPelicula(req, resp){



    var datosRecibidos = req.body;

    var usuarioAutenticado = req.usuario; // El usuario autenticado se añade aquí

    // Verificar si el usuario es admin
    if (usuarioAutenticado.role !== 'admin') {
        return resp.status(403).send({ message: "No tienes permisos para crear películas." });
    }



    var agregarPelicula = new peliculas();
    
    agregarPelicula.titulo = datosRecibidos.titulo;
    agregarPelicula.director = datosRecibidos.director;
    agregarPelicula.añoLanzamiento = datosRecibidos.añoLanzamiento
    agregarPelicula.productora = datosRecibidos.productora;
    agregarPelicula.precio = datosRecibidos.precio;

    

    agregarPelicula.save().then(
        (peliculaCreada) => {
            resp.status(200).send({peliculaCreada:peliculaCreada });
        },
        err => {
            console.log(err);
            resp.status(500).send({message: "no se pudo crear, intente nuevamente"});
        }
    );
}


///////////////////////////////////////////Para consultar peliculas mayor a x año y menor o igual a x precio
function obtenerPeliculasPorAnoYPrecio(req, res) {
    const anoLanzamiento = req.params.anoLanzamiento; // Obtener el año de lanzamiento del parámetro
    const precioMaximo = req.params.precioMaximo;   // Obtener el precio máximo del parámetro

    // Convertir los parámetros a números
    const ano = parseInt(anoLanzamiento);
    const precio = parseFloat(precioMaximo);

    // Verificar que los parámetros sean válidos
    if (isNaN(ano) || isNaN(precio)) {
        return res.status(400).send({ message: 'Parámetros inválidos. Asegúrate de enviar un año y un precio válidos.' });
    }

    // Consultar las películas según los criterios especificados
    peliculas.find({
        añoLanzamiento: { $gt: ano }, // Año de lanzamiento mayor al ingresado
        precio: { $lte: precio }      // Precio menor o igual al ingresado
    })
    .then(peliculasEncontradas => {
        // Verificar si se encontraron películas
        if (!peliculasEncontradas || peliculasEncontradas.length === 0) {
            return res.status(404).send({ message: 'No se encontraron películas que cumplan con los criterios.' });
        }

        // Devolver las películas encontradas
        res.status(200).send({ peliculas: peliculasEncontradas });
    })
    .catch(err => {
        console.error(err); // Para depuración
        res.status(500).send({ message: 'Error al obtener las películas.' });
    });
}





/////////////////////////////

module.exports = {
    agregarPelicula,
    obtenerPeliculas,
    obtenerPeliculasPorAnoYPrecio
}   