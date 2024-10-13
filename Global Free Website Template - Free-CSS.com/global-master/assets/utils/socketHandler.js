module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('A user connected');
  
      // Handle joining a room (e.g., for private messaging)
      socket.on('join', (room) => {
        socket.join(room);
      });
  
      // Handle leaving a room
      socket.on('leave', (room) => {
        socket.leave(room);
      });
  
      // Handle new messages
      socket.on('new_message', (data) => {
        io.to(data.room).emit('new_message', data);
      });
  
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  };