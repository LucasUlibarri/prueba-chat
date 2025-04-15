//websocket cliente

//se incio la conexion desde cliente
const socket = io();

const main = () => {

    //se escucha un evento
    socket.on('welcome', (data) => {
        console.log(data);
    })

    //formulario
    const formChat = document.getElementById('formChat');
    const inputChat = document.getElementById('inputChat');
    const inputUsername = document.getElementById('inputUsername');

    formChat.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = inputUsername.value;
        const message = inputChat.value;
        inputChat.value = '';
        //emitir evento
        socket.emit('new message', {message, username});
    });

    //capturar mensajes nuevos
    socket.on('broadcast new message', (dataMessage) => {
        //insertar el msj en html
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML += `<p>${dataMessage.username} - ${dataMessage.message}</p>`;
    })

    //capturar historial de msj
    socket.on('message history', (message) => {
        const chatBox = document.getElementById('chatBox');
        message.forEach((dataMessage)=>{
            chatBox.innerHTML += `<p>${dataMessage.username} - ${dataMessage.message}</p>`;  
        })
    });

}

main();