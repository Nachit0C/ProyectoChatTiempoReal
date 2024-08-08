import { Server } from 'socket.io';
import { createServer } from 'node:http';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());

io.on('connection', (socket)=>{
    console.log("Un usuario se ha conectado.");

    socket.on('disconnect', ()=>{
        console.log("Un usuario se ha desconectado.")
    });

    socket.on('chat message', (message)=>{
        //console.log(`Mensaje recibido: ${message}`);
        io.emit('chat message', message);
    });
});

app.get("/", (req,res) =>{
    //res.send("<h1>Bienvenido al chat!</h1>");
    res.sendFile(path.join(__dirname, `/cliente/index.html`));
    //res.sendFile(process.cwd() + `/cliente/index.html`);
});

server.listen(port, ()=>{
    console.log(`Servidor levantando y andando en el puerto ${port}`);
});