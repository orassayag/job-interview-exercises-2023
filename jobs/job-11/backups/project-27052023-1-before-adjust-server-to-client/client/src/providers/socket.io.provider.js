import { io } from 'socket.io-client';

class SocketIOProvider {
  constructor() {
    // "undefined" means the URL will be computed from the `window.location` object.
    const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8081';
    this.socket = io(URL);
  }
}

export default new SocketIOProvider();
