import io from 'socket.io-client';
// const sockets = io('http://localhost:3001');
const sockets = io('https://backend-socket-tabarani.herokuapp.com/');
export default sockets;
