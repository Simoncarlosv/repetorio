const fs = require('fs')
const path = require('path')

// Ruta al archivo JSON de canciones
const filePath = path.join(__dirname, "../../repertorio.json");


// Constante para leer el archivo JSON
const readData = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Constante para escribir en el archivo JSON
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// Traer todas las canciones
const getCanciones = (req, res) => {
  const canciones = readData();
  res.json(canciones);
};

// Crear una nueva canción
const createCancion = (req, res) => {
  const canciones = readData();
  const nuevaCancion = req.body;
  canciones.push(nuevaCancion);
  writeData(canciones);
  res.status(201).json({ message: "Canción agregada", nuevaCancion });
};

// Actualizar una canción por ID
const updateCancion = (req, res) => {
  const { id } = req.params;
  const canciones = readData();
  const index = canciones.findIndex((c) => c.id === parseInt(id));

  if (index !== -1) {
    canciones[index] = { ...canciones[index], ...req.body };
    writeData(canciones);
    res.json({ message: "Canción actualizada", cancion: canciones[index] });
  } else {
    res.status(404).json({ message: "Canción no encontrada" });
  }
};

// Eliminar una canción por ID
const deleteCancion = (req, res) => {
  const { id } = req.params;
  const canciones = readData();
  const filteredCanciones = canciones.filter((c) => c.id !== parseInt(id));

  if (filteredCanciones.length !== canciones.length) {
    writeData(filteredCanciones);
    res.json({ message: "Canción eliminada" });
  } else {
    res.status(404).json({ message: "Canción no encontrada" });
  }
};

module.exports = {
  getCanciones,
  createCancion,
  updateCancion,
  deleteCancion,
};