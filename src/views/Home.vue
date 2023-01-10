<template>
  <div class="home-container">
    <div class="home-content">
      <h1>Informe o seu nome</h1>

      <input placeholder="Informe o nome" v-model="state.name" />

      <button @click="onSubmit">Entrar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import ChatManager from "../services/ChatManager";

export default {
  name: "HomePage",
  setup() {
    const router = useRouter();

    const state = reactive({
      name: "",
    });

    function onSubmit() {
      ChatManager.onSetName(state.name);
      router.push("chat");
    }

    return {
      state,
      onSubmit,
    };
  },
  mounted() {
    ChatManager.onConnect();
  },
};
</script>

<style lang="scss">
.home {
  &-container {
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-content {
    margin: auto;
    min-width: 600px;
    min-height: 600px;
    padding: 40px;
    background: var(--white);
    border-radius: 16px;

    -webkit-box-shadow: 6px 6px 17px -1px rgba(0, 0, 0, 0.34);
    -moz-box-shadow: 6px 6px 17px -1px rgba(0, 0, 0, 0.34);
    box-shadow: 6px 6px 17px -1px rgba(0, 0, 0, 0.34);

    h1 {
      text-align: center;
      font-size: 40px;
      color: var(--main);
      margin-top: 24px;
      margin-bottom: 64px;
    }

    input {
      height: 56px;
      width: 100%;
      font-size: 20px;
      padding-left: 16px;
    }

    button {
      display: block;
      padding: 16px 32px;
      background: var(--main);
      color: var(--white);
      font-weight: 700;
      font-size: 18px;
      border-radius: 12px;
      margin-left: auto;
      margin-top: 230px;
    }
  }
}
</style>
