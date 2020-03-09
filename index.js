const net = require('net');

const sockets = new Set();

const server = net.createServer((socket) => {

  socket.on('data', (data) => {
    sockets.forEach((s) => {
      s.write(data);
    })
    console.log(data);
  });

  socket.on('close', () => {
    sockets.delete(socket);
    console.log('socket close');
    console.log('sockets size: ', sockets.size);
  });

  socket.write('hello\n');
  sockets.add(socket);
  console.log('connect socket');
  console.log('sockets size: ', sockets.size);
});

server.on('error', (err) => {
  // Handle errors here.
  throw err;
});

// Grab an arbitrary unused port.
server.listen(12345, () => {
  console.log('opened server on', server.address());
});
