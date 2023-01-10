import { reactive } from "vue";

const WEBSOCKET_URL =
  "wss://0ofeqz0qw0.execute-api.us-east-1.amazonaws.com/production";

class ChatManager {
  private socket: WebSocket | undefined;
  public members: string[] = [];

  public onConnect() {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(WEBSOCKET_URL);

      this.socket.addEventListener("open", () =>
        console.log("conexão iniciada")
      );
      this.socket.addEventListener("close", () =>
        console.log("conexão encerrada")
      );
      this.socket.addEventListener("message", (event) => {
        this.onSocketMessage(event.data);
      });
    }
  }

  private onSocketMessage(dataStr: any) {
    const data = JSON.parse(dataStr);
    if (data.members) {
      this.members = data.members;
      console.log(this.members);
    } else if (data.publicMessage) {
      console.log(data.publicMessage);
    } else if (data.privateMessage) {
      console.log(data.privateMessage);
    } else if (data.systemMessage) {
      console.log(data.systemMessage);
    }
  }

  public onSetName(name: string) {
    this.socket?.send(JSON.stringify({ action: "setName", name }));
  }
}

export default reactive(new ChatManager());
