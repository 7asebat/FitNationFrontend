<template>
  <div
    class="c-builder-empty-state bg-light p-5 text-center"
    @click.prevent="handleClickEvent"
  >
    <h1 class="text-secondary">
      <i class="fas fa-plus-circle"></i>
    </h1>
    <h6 class="text-secondary">Add food to this recipe</h6>
  </div>
</template>

<script>
export default {
  methods: {
    handleClickEvent() {
      this.$emit("clicked");
    },
  },
};
</script>

<style lang="scss" scoped>
.c-builder-empty-state {
  cursor: pointer;
  border-radius: $border-radius;
}
</style>