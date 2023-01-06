const socket = new WebSocket('ws://localhost:5000');

socket.addEventListener('open', (event:Event) => {
    console.log('Connected');
})

socket.addEventListener('message',(event:MessageEvent) => {
    console.log(event.data);
})

export {};