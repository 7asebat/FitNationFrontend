<template>
  <div>Chat {{ chatId }}</div>
</template>

<script>
export default {
  props: {
    chatId: [String, Number],
  },
};
</script>