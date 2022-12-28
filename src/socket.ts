export const initSocket = () => {
    const socket = new WebSocket('ws://localhost:5000');

    socket.addEventListener('open', (event: Event) => {
        socket.send('Hello server');
    })

    socket.addEventListener('message', (event: MessageEvent) => {
        console.log(`Message from server: ${event.data}`);
    })
}

