import io from 'socket.io-client';
const socket = io('http://localhost:3001');
// const socket = io('https://backend.connect-asl.site/');
export default socket;
