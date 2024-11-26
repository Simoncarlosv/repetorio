const { Router } = require('express')
const path = require('path')
const {
    getCanciones,
    createCancion,
    updateCancion,
    deleteCancion,
  } = require("../controllers/canciones.controller");

const router = Router()


router.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + '/../index.html'))
})


// Rutas CRUD
router.get("/canciones", getCanciones); // Obtener todas las canciones
router.post("/canciones", createCancion); // Crear una canción
router.put("/canciones/:id", updateCancion); // Actualizar una canción
router.delete("/canciones/:id", deleteCancion); // Eliminar una canción

module.exports = router