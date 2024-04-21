import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer as WSServerDecorator,
} from '@nestjs/websockets';
import { WebSocketServer, WebSocket } from 'ws';

@Injectable()
@WebSocketGateway()
export class AppGateway {
  @WSServerDecorator()
  server: WebSocketServer;

  handleDisconnect(client: WebSocket) {
    // for (let i = 0; i < this.server.clients.size; i++) {
    //   console.log(this.server.clients);
    //   if (this.server.clients[i] === client.id) {
    this.server.clients.delete(client);
    //     break;
    //   }
    // }
    this.broadcast('disconnect');
  }

  private broadcast(message: string) {
    const broadCastMessage = JSON.stringify(message);
    for (const c of this.server.clients) {
      c.send(broadCastMessage);
    }
  }

  @SubscribeMessage('events')
  eventHandler(@MessageBody() msgBody: string) {
    this.broadcast(msgBody);
  }
}
