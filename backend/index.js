import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
app.use(express.json()); // leer el json

dotenv.config();

conectarDB();

//Configurar CORS
// Add white list for requets
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      // Can consult the API 
      callback(null, true)
    } else {
      // not allowed
      callback(new Error('Error de Cors'));
    }
  }
}

app.use(cors(corsOptions));

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Socket.io
import { Server } from 'socket.io'

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  }
})

io.on('connection', (socket) => {
  // Define socket io events

  socket.on('open project', (project) => {
    // enters the same room
    socket.join(project);
  })

  socket.on('new task', task => {
    socket.to(task.project).emit('task added', task);
  })

  socket.on('delete task', task => {
    socket.to(task.project).emit('task deleted', task);
  })
})