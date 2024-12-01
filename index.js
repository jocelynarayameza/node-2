const express = require("express")
const app = express()
const fs = require("fs")
const cors = require('cors');

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
        res.sendFile(__dirname + "/index.html")
});

//FUNCIONA OK
app.get('/canciones', (req, res) => {
        try {
                const data = fs.readFileSync('repertorio.json', 'utf-8');
                const canciones = JSON.parse(data);
                res.json(canciones);
        } catch (error) {
                res.status(500).json({ error: 'Error al obtener las canciones' });
        }
});

//FUNCIONA OK
app.post('/canciones', (req, res) => {
        try {
                const nuevaCancion = req.body;
                const data = fs.readFileSync('repertorio.json', 'utf-8');
                const canciones = JSON.parse(data);
                canciones.push(nuevaCancion);
                fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
                res.status(201).json({ mensaje: 'Canción agregada', nuevaCancion });
        } catch (error) {
                res.status(500).json({ error: 'Error al agregar la canción' });
        }
});

app.put('/canciones/:id', (req, res) => {
        try {
                const id = parseInt(req.params.id);
                const data = fs.readFileSync('repertorio.json', 'utf-8');
                const canciones = JSON.parse(data);

                const index = canciones.findIndex(c => c.id === id);
                if (index === -1) {
                        return res.status(404).json({ error: 'Canción no encontrada' });
                }

                canciones[index] = { ...canciones[index], ...req.body, id };
                fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
                res.json({ mensaje: 'Canción actualizada', cancion: canciones[index] });
        } catch (error) {
                res.status(500).json({ error: 'Error al actualizar la canción' });
        }
});

app.delete('/canciones/:id', (req, res) => {
        try {
                const id = parseInt(req.params.id);
                const data = fs.readFileSync('repertorio.json', 'utf-8');
                const canciones = JSON.parse(data);

                const nuevasCanciones = canciones.filter(c => c.id !== id);
                if (canciones.length === nuevasCanciones.length) {
                        return res.status(404).json({ error: 'Canción no encontrada' });
                }

                fs.writeFileSync('repertorio.json', JSON.stringify(nuevasCanciones));
                res.json({ mensaje: 'Canción eliminada' });
        } catch (error) {
                res.status(500).json({ error: 'Error al eliminar la canción' });
        }
});


app.listen(3001, console.log("Servidor ejecutandose en el puerto 3001"))