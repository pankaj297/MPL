import { io } from "socket.io-client";

export const socket = io("https://mpl-backend-5gc6.onrender.com", {
  path: "/socket.io",
  transports: ["polling", "websocket"], // polling first, upgrade to websocket if possible
  timeout: 20000,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

socket.on("connect_error", (err) =>
  console.warn("connect_error", err?.message)
);

// if (socket.connected) socket.emit("getCurrentAuctionState");
// // and also listen for 'connect' to emit when socket connects later
// socket.on("connect", () => socket.emit("getCurrentAuctionState"));
