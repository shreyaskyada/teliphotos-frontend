// lib/socket.ts
import { io, Socket } from "socket.io-client";
import { CONFIG } from "./config";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(CONFIG.BASE_BACKEND_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
};
