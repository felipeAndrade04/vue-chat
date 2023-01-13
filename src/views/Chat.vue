<template>
  <div class="chat-container">
    <div class="chat-content">
      <div class="chat-content--sidebar">
        <p>
          Olá, <br />
          {{ name }}
        </p>

        <button @click="onDisconnect">
          <img src="../assets/exit.svg" />
        </button>
      </div>
      <div class="chat-content--members">
        <div
          v-if="state.members.length < 1"
          class="chat-content--members-empty"
        >
          <img src="../assets/Alert.svg" />
          <p>Opps! Nenhum usuário ativo para conversas</p>
        </div>
        <div v-else class="chat-content--members-list">
          <h1>Amigos</h1>

          <div v-for="member in state.members" :key="member">
            <p>{{ member }}</p>
          </div>
        </div>
      </div>
      <div class="chat-content--messages">
        <div
          v-if="state.messages.length < 1"
          class="chat-content--messages-empty"
        >
          <img src="../assets/Alert.svg" />
          <p>Opps! Nenhum mensagem foi enviada</p>
        </div>
        <div v-else class="chat-content--messages-list" ref="chatList">
          <message
            v-for="message in state.messages"
            :key="message.id"
            :content="message.message"
            :fromCurrentUser="state.currentUser?.id === message.id"
          />
        </div>

        <div class="chat-content--messages-footer">
          <input
            v-model="state.message"
            @keyup.enter="onSendMessage"
            placeholder="Mensagem"
          />
          <button @click="onSendMessage">
            <img src="../assets/send.svg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, watch, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import ChatManager from "../services/ChatManager";
import { User, Message as MessageType } from "../services/ChatManager";
import Message from "../components/Message.vue";

interface State {
  message: string;
  currentUser: User;
  members: string[];
  messages: MessageType[];
}

export default {
  name: "ChatPage",
  components: { Message },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const chatList = ref<HTMLElement>();

    const name = route.params.name as string;

    const state: State = reactive({
      message: "",
      currentUser: { id: "", name: "" },
      members: [],
      messages: [],
    });

    function onSendMessage() {
      ChatManager.onSendMessage(state.message);
      state.message = "";
    }

    function onDisconnect() {
      ChatManager.onDisconnect();
      router.back();
    }

    watch(ChatManager, (manager) => {
      state.currentUser = manager.currentUser;
      state.members = Object.values(manager.members).filter(
        (member) => member !== name
      );
      state.messages = manager.messages;
    });

    watch(ChatManager.messages, () => {
      nextTick(() => {
        if (chatList.value) {
          chatList.value.scrollTop = chatList.value.scrollHeight + 200;
        }
      });
    });

    return {
      name,
      state,
      chatList,
      onSendMessage,
      onDisconnect,
    };
  },
  mounted() {
    ChatManager.onConnect();
  },
};
</script>

<style lang="scss">
.chat {
  &-container {
    height: 100vh;
    width: 100vw;
    padding: 32px;
  }

  &-content {
    margin: 0 auto;
    max-width: 1440px;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1.8fr 3.7fr;
    gap: 32px;

    &--sidebar {
      background: var(--main);
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-size: 24px;
        font-weight: 500;
        color: var(--white);
        line-height: 110%;
      }

      button {
        background: transparent;
        margin-top: auto;
      }
    }

    &--members,
    &--messages {
      background: var(--white);
      border-radius: 20px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    &--members {
      padding: 16px;

      &-empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 220px;
        }

        p {
          font-size: 20px;
          text-align: center;
          margin-top: -16px;
        }
      }

      &-list {
        h1 {
          font-size: 22px;
          margin-bottom: 12px;
        }

        div {
          padding: 16px;
          border-bottom: 1px solid var(--gray);

          p {
            font-size: 18px;
            font-weight: 500;
            color: var(--gray-600);
          }
        }
      }
    }

    &--messages {
      padding: 24px;
      padding-right: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 24px;
      overflow-y: auto;

      &-empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 220px;
        }

        p {
          font-size: 20px;
          text-align: center;
          margin-top: -16px;
        }
      }

      &-list {
        padding-right: 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
      }

      &-footer {
        padding-top: 24px;
        padding-right: 24px;
        border-top: 1px solid var(--gray);
        display: flex;
        gap: 16px;

        input {
          width: 100%;
          height: 40px;
          padding: 0px 12px;
          background: var(--gray-200);
          border: none;
          border-radius: 8px;
          font-size: 16px;
        }

        button {
          height: 40px;
          min-width: 40px;
          background: var(--main);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
