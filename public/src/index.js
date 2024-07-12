const express = require('express');
const morgan = require('morgan');
const path = require('path');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const database = require("./database");
const port = process.env.PORT || 4000;

// Config inicial
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public'))); // Servir archivos estáticos

const secretKey = process.env.SECRET_KEY || 'your_secret_key'; // Cambia esto por tu clave secreta

// Middleware para verificar el token
function verificarToken(req, res, next) {
    const tokenHeader = req.headers.authorization || req.cookies.token; 
    if (!tokenHeader) {
        return res.sendStatus(403);
    }
    const tokenBearer = tokenHeader.split(" ")[1] || tokenHeader; 
    req.token = tokenBearer;
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = authData; 
        next();
    });
}

// Ruta para el login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username, role: 'admin' }, secretKey, { expiresIn: "5m" });

        // Configurar la cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Cambia a true en producción
            maxAge: 5 * 60 * 1000 // 5 minutos
        });

        return res.json({ 
            message: 'Login exitoso', 
            token // Devolver el token
        });
    }
    res.status(401).send('Credenciales inválidas');
});

// Ruta para acceder al archivo login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
});

// Ruta para acceder al archivo admin.html
app.get('/admin', verificarToken, (req, res) => {
    if (req.user.role === "admin") {
        const filePath = path.join(__dirname, '..', 'admin.html'); 
        return res.sendFile(filePath);
    }
    res.sendStatus(403); // Prohibido
});

// Rutas para manejar destinos
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
        
        const query = `
            SELECT id_destino, nombre, pais, descripcion, precio
            FROM destinos
            WHERE id_destino = ?
        `;
        
        const result = await connection.query(query, [id]);

        if (result.length > 0) {
            res.json(result[0]);
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

        // Eliminar actividades asociadas
        await connection.query(`DELETE FROM actividades WHERE id_destino = ?`, [id]);

        // Eliminar destinos_nacionales asociados
        await connection.query(`DELETE FROM destinos_nacionales WHERE id_destino = ?`, [id]);


        // Eliminar destinos_internacionales asociados
        await connection.query(`DELETE FROM destinos_internacionales WHERE id_destino = ?`, [id]);

        // Ahora eliminar el destino
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



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
});
