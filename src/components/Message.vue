<template>
  <div
    class="message-container"
    :class="messageFromCurrentUser ? 'author' : ''"
  >
    <div
      class="message-content"
      :class="messageFromCurrentUser ? 'author' : ''"
    >
      <strong v-if="!messageFromCurrentUser">{{ messageAuthor }}</strong>
      <p>{{ messageContent }}</p>
    </div>
    <p>{{ messageCreated_at }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "chat-message",
  props: {
    fromCurrentUser: { type: Boolean, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    created_at: { type: Date, required: true },
  },
  setup(props: any) {
    function formatDate(date: Date) {
      const day = date.getDay().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hour = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}/${month}/${year} - ${hour}:${minutes}`;
    }

    const formattedDate = formatDate(props.created_at as Date);

    return {
      messageContent: props.content,
      messageFromCurrentUser: props.fromCurrentUser,
      messageAuthor: props.author,
      messageCreated_at: formattedDate,
    };
  },
};
</script>

<style lang="scss">
.message {
  &-container {
    margin-right: auto;

    &.author {
      margin-left: auto;
      margin-right: 0;

      > p {
        text-align: right;
      }
    }

    > p {
      font-size: 10px;
      font-weight: 400;
      color: var(--gray-400);
      margin-top: 4px;
      text-align: left;
    }
  }

  &-content {
    padding: 6px 12px;
    border-radius: 10px;
    background: var(--gray);
    font-size: 14px;

    strong {
      font-size: 12px;
      font-weight: 500;
      color: var(--main);
      margin-bottom: 4px;
      display: block;
    }

    &.author {
      background: var(--main);
      color: var(--white);
    }
  }
}
</style>
