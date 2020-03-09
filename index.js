const net = require('net');

const sockets = new Set();
const messages = [
  'ChatBott: Hello everyone!\n',
];

const server = net.createServer((socket) => {

  socket.on('data', (data) => {
    let string = data.toString();
    console.log(string.slice(0, string.length - 2));
    messages.push(string);
    while (messages.length > 33) {
      messages.shift();
    }
    sockets.forEach((s) => {
      s.write(data);
    })
  });

  socket.on('close', () => {
    sockets.delete(socket);
    console.log('socket close');
    console.log('sockets size: ', sockets.size);
  });

  messages.forEach((message) => {
    socket.write(message);
  });
  sockets.add(socket);
  console.log('connect socket');
  console.log('sockets size: ', sockets.size);
});

server.on('error', (err) => {
  // Handle errors here.
  // throw err;
});

// Grab an arbitrary unused port.
server.listen(12345, () => {
  console.log('opened server on', server.address());
});
