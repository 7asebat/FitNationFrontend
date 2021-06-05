<template>
  <b-button
    :variant="variant"
    :disabled="isLoading || disable"
    @click="btnClicked"
  >
    <b-spinner
      small
      type="grow"
      v-show="isLoading"
      class="mr-3 c-button-main__spinner"
    ></b-spinner>
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    btnClicked() {
      this.$emit("clicked", this.loading);
    },
    loading(bool) {
      this.isLoading = bool;
    },
  },
  props: {
    //optional if the user would like to disable the btn
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    variant: {
      type: String,
      required: false,
      default: "primary",
    },
  },
};
</script>

<style lang="scss" scoped>
.c-button-main__spinner {
  vertical-align: middle;
}
</style>