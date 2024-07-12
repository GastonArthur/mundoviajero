const express = require('express');
const morgan = require('morgan');
const database = require('./database');
const path = require('path');
const port = process.env.PORT || 4000;

// Config inicial
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde la carpeta 'public'

// Rutas
// Obtener todos los destinos
app.get('/destinos', async (req, res) => {
    try {
        const connection = await database.getConnection();
        const result = await connection.query("SELECT * FROM destinos");
        res.json(result);
        connection.release(); // Liberar la conexión después de usarla
    } catch (error) {
        console.error('Error al obtener destinos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener un destino por su ID
app.get('/destinos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await database.getConnection();
        const query = 'SELECT * FROM destinos WHERE id = ?';
        const result = await connection.query(query, [id]);
        
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ error: 'Destino no encontrado' });
        }

        connection.release(); // Liberar la conexión después de usarla
    } catch (error) {
        console.error('Error al obtener destino por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Agregar un nuevo destino
app.post('/destinos', async (req, res) => {
    const { nombre, pais, descripcion, precio } = req.body;
    try {
        const connection = await database.getConnection();
        const insertQuery = 'INSERT INTO destinos (nombre, pais, descripcion, precio) VALUES (?, ?, ?, ?)';
        const result = await connection.query(insertQuery, [nombre, pais, descripcion, precio]);

        res.json({ message: 'Destino agregado correctamente' });

        connection.release(); // Liberar la conexión después de usarla
    } catch (error) {
        console.error('Error al agregar destino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar un destino por su ID
app.put('/destinos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, pais, descripcion, precio } = req.body;
    try {
        const connection = await database.getConnection();
        const updateQuery = 'UPDATE destinos SET nombre = ?, pais = ?, descripcion = ?, precio = ? WHERE id = ?';
        const result = await connection.query(updateQuery, [nombre, pais, descripcion, precio, id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Destino actualizado correctamente' });
        } else {
            res.status(404).json({ error: 'Destino no encontrado' });
        }

        connection.release(); // Liberar la conexión después de usarla
    } catch (error) {
        console.error('Error al actualizar destino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar un destino por su ID
app.delete('/destinos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await database.getConnection();
        const deleteQuery = 'DELETE FROM destinos WHERE id = ?';
        const result = await connection.query(deleteQuery, [id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Destino eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Destino no encontrado' });
        }

        connection.release(); // Liberar la conexión después de usarla
    } catch (error) {
        console.error('Error al eliminar destino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
});
