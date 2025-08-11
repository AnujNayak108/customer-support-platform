import { Server } from 'socket.io';
import type { Server as HttpServer } from 'http';

let io: Server | null = null;

export function initSocket(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: ["https://customer-support-platform-frontend.onrender.com"],
      methods: ["GET", "POST", "PATCH"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('join', (roomId: string) => {
      if (roomId) socket.join(roomId);
    });
  });

  return io;
}

export function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
} 