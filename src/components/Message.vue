<template>
  <div class="message" :class="messageFromCurrentUser ? 'author' : ''">
    <strong v-if="!messageFromCurrentUser">{{ messageAuthor }}</strong>
    <p>{{ messageContent }}</p>
  </div>
</template>

<script lang="ts">
import { toRefs } from "vue";

export default {
  name: "chat-message",
  props: {
    fromCurrentUser: { type: Boolean, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  setup(props: any) {
    const { author, content, fromCurrentUser } = toRefs(props);

    return {
      messageContent: content,
      messageFromCurrentUser: fromCurrentUser,
      messageAuthor: author,
    };
  },
};
</script>

<style lang="scss">
.message {
  padding: 6px 12px;
  border-radius: 10px;
  background: var(--gray);
  font-size: 14px;
  margin-right: auto;

  strong {
    font-size: 12px;
    font-weight: 500;
    color: var(--main);
    margin-bottom: 4px;
    display: block;
  }
}
.author {
  background: var(--main);
  color: var(--white);
  margin-left: auto;
  margin-right: 0;
}
</style>
