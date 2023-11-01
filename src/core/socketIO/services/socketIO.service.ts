import { Injectable } from "@nestjs/common";
import * as SocketIO from "socket.io";
import { Server } from "http";
import { Subject } from "rxjs";

@Injectable()
export class SocketIOService {
  private io: SocketIO.Server;

  private connectHandler: Subject<SocketIO.Socket>;

  constructor() {}

  createSocketServer(server: Server) {
    if (this.io) {
      throw new Error("SocketIO Initialized");
    }

    this.io = new SocketIO.Server(server, {
      transports: ["websocket", "polling"],
      cors: { origin: "*" }
    });

    this.io.sockets.setMaxListeners(0);

    console.log("socket server created");

    return this.io;
  }

  onConnect(): Subject<SocketIO.Socket> {
    if (!this.connectHandler) {
      this.connectHandler = new Subject();

      this.io.on("connection", async (socket: SocketIO.Socket) => {
        // Disable max listener limit
        socket.setMaxListeners(0);

        socket.on("disconnect", () => {
          console.log('User Disconnect');
        });

        this.connectHandler.next(socket);
      });
    }

    return this.connectHandler;
  }

  send(key: string, value: any) {
    return this.io.emit(key, value);
  }
}
