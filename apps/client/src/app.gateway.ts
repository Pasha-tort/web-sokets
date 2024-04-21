import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  async handlerEvent(@ConnectedSocket() client: any) {
    console.log(client);
  }
}
