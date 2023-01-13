<template>
  <div class="message" :class="fromCurrentUser ? 'author' : ''">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "chat-message",
  props: {
    fromCurrentUser: { type: Boolean, required: true },
    content: { type: String, required: true },
  },
  setup(props: any) {
    return {
      message: props.content,
      // eslint-disable-next-line vue/no-dupe-keys
      fromCurrentUser: props.fromCurrentUser,
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
}
.author {
  background: var(--main);
  color: var(--white);
  margin-left: auto;
  margin-right: 0;
}
</style>
