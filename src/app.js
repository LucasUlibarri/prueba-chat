import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

//Handlebars config
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');



const PORT = 8080

app.use(express.static('public'));


//endpoints
app.use('/', viewsRouter)

//persistencia en memoria de los mensajes
const message = [];

//websocket server
io.on('connection', (socket)=>{
  console.log('Un nuevo usuario se conecto');

  socket.emit('welcome', {greeting: 'Bienvenido al chat'})

  //se emite el historial de mensajes
  socket.emit('message history', message);

  //escucha evento
  socket.on('new message', (dataMessage) => {
    message.push(dataMessage);
    
    //transmitir nuevo msj a todos los clientes
    io.emit('broadcast new message', dataMessage);
  })
});

server.listen(PORT, ()=> {
    console.log('servidor inciado en el puerto: ', PORT);
});