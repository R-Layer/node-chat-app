const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from:'jhonny@test.com',
    text: 'Hey, here i am'
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('newMessage', message);
});
