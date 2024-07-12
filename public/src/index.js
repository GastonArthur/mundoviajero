const express = require('express');
const morgan = require('morgan');
const database = require("./database");
const path = require('path');

// Config inicial
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));
console.log('Servidor web online en puerto 4000');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta 'public'

// Rutas
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/destinos', async (req, res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM destinos");
    res.json(result);
});

// Ruta GET /destinos/:id para obtener un destino por ID
app.get('/destinos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await database.getConnection();
        
        // Consulta para obtener el destino por su ID
        const query = `
            SELECT id_destino, nombre, pais, descripcion, precio
            FROM destinos
            WHERE id_destino = ?
        `;
        
        const result = await connection.query(query, [id]);

        if (result.length > 0) {
            res.json(result[0]); // Devolver el primer resultado encontrado
        } else {
            res.status(404).json({ error: 'Destino no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener destino por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta PUT /destinos/:id para actualizar un destino por ID
app.put('/destinos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, pais, descripcion, precio } = req.body;
    try {
        const connection = await database.getConnection();
        
        // Consulta para actualizar el destino por su ID
        const updateQuery = `
            UPDATE destinos
            SET nombre = ?, pais = ?, descripcion = ?, precio = ?
            WHERE id_destino = ?
        `;
        
        const result = await connection.query(updateQuery, [nombre, pais, descripcion, precio, id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Destino actualizado correctamente' });
        } else {
            res.status(404).json({ error: 'Destino no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar destino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta POST /destinos para agregar un nuevo destino
app.post('/destinos', async (req, res) => {
    const { nombre, pais, descripcion, precio } = req.body;
    try {
        const connection = await database.getConnection();
        
        // Consulta para agregar el nuevo destino
        const insertQuery = `
            INSERT INTO destinos (nombre, pais, descripcion, precio)
            VALUES (?, ?, ?, ?)
        `;
        
        const result = await connection.query(insertQuery, [nombre, pais, descripcion, precio]);

        res.json({ message: 'Destino agregado correctamente' });
    } catch (error) {
        console.error('Error al agregar destino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta DELETE /destinos/:id para eliminar un destino por ID
app.delete('/destinos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await database.getConnection();
        
        // Consulta para eliminar el destino por su ID
        const deleteQuery = `
            DELETE FROM destinos
            WHERE id_destino = ?
        `;
        
        const result = await connection.query(deleteQuery, [id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Destino eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Destino no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar destino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

