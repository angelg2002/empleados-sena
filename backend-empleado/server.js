// importar las dependencias necesarias

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');



//iniciamos la app de la aplicación Express

const app = express();

app.use(cors());
app.use(express.json());

//configuración de la conexionde la base de datos

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// contectamos a una base de datos 

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

app.get("/", (req, res) => {
    res.send("Bienvenido al sistema de empleados");
});

// Iniciar el servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// --- RUTAS DEL CRUD ---

// RUTA GET: Listar todos los empleados (Read)
app.get('/api/empleados', (req, res) => {
    // 1. Escribimos la consulta SQL (la misma que usarías en Workbench)
    const sql = 'SELECT * FROM empleados';
    
    // 2. Ejecutamos la consulta en la base de datos
    db.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al obtener empleados:', error);
            // Si hay error, le decimos al frontend (status 500 es Error de Servidor)
            return res.status(500).json({ mensaje: 'Error al consultar la base de datos' });
        }
        
        // Si todo sale bien, enviamos los resultados al frontend en formato JSON
        res.json(resultados);
    });
});


// RUTA POST: Crear un nuevo empleado (Create)
app.post('/api/empleados', (req, res) => {
    // 1. Extraemos los datos que el celular nos enviará en el "cuerpo" (body) de la petición
    const { nombre, apellido, cargo, salario } = req.body;

    // 2. Pequeña validación: nos aseguramos de que no envíen datos en blanco
    if (!nombre || !apellido || !salario) {
        return res.status(400).json({ mensaje: 'El nombre, apellido y salario son obligatorios' });
    }

    // 3. Preparamos la consulta SQL. 
    // Usamos los signos "?" por seguridad, para evitar inyecciones de código malicioso.
    const sql = 'INSERT INTO empleados (nombre, apellido, cargo, salario) VALUES (?, ?, ?, ?)';
    const valores = [nombre, apellido, cargo, Number(salario)];

    // 4. Ejecutamos la orden en MySQL
    db.query(sql, valores, (error, resultados) => {
        if (error) {
            console.error('Error al insertar el empleado:', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor al guardar' });
        }
        
        // Si todo sale bien, respondemos con éxito y devolvemos el ID del nuevo empleado
        res.status(201).json({ 
            mensaje: 'Empleado guardado con éxito', 
            id: resultados.insertId 
        });
    });
});

// Ruta para eliminar un empleado (Delete)

app.delete('/api/empleados/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM empleados WHERE id = ?';

    db.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error('Error al eliminar el empleado:', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor al eliminar' });
        }
        res.json({ mensaje: 'Empleado eliminado con éxito' });
    });
});

//Ruta para actualizar un empleado (Update)

app.put('/api/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cargo, salario } = req.body;

    const sql = 'UPDATE empleados SET nombre = ?, apellido = ?, cargo = ?, salario = ? WHERE id = ?';
    // Convertimos id explícitamente a Number para evitar conflictos con MySQL
    const valores = [nombre, apellido, cargo, Number(salario), Number(id)];

    db.query(sql, valores, (error, resultados) => {
        if (error) {
            console.error('Error al actualizar el empleado:', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor al actualizar' });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado para actualizar' });
        }
        res.json({ mensaje: 'Empleado actualizado con éxito' });
    });
});
