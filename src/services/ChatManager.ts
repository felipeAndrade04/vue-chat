import { reactive } from "vue";

const WEBSOCKET_URL =
  "wss://0ofeqz0qw0.execute-api.us-east-1.amazonaws.com/production";

export interface Member {
  [key: string]: string;
}

export interface Message {
  id: string;
  message: string;
  created_at: Date;
}

export interface User {
  id: string;
  name: string;
}

class ChatManager {
  private socket: WebSocket | undefined;
  public members: Member = {};
  public messages: Message[] = [];
  public currentUser: User = { id: "", name: "" };

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

    if (data.user) {
      this.currentUser = data.user;
    } else if (data.members) {
      this.members = data.members;
    } else if (data.publicMessage) {
      this.messages.push(data.publicMessage);
    } else if (data.privateMessage) {
      console.log(data.privateMessage);
    } else if (data.systemMessage) {
      console.log(data.systemMessage);
    }
  }

  public onSetName(name: string) {
    this.socket?.send(JSON.stringify({ action: "setName", name }));
  }

  public onSendMessage(message: string) {
    const created_at = new Date();
    this.socket?.send(
      JSON.stringify({ action: "sendPublic", message, created_at })
    );
  }

  public onDisconnect() {
    this.socket?.close();
  }
}

export default reactive(new ChatManager());
