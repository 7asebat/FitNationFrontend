<template>
  <div>
    <b-modal
      :centered="centered"
      :id="modalId"
      :title="title ? title : 'Delete'"
    >
      <slot></slot>
      <template v-slot:modal-footer>
        <b-button variant="secondary mr-2" @click="cancel"> Cancel </b-button>

        <b-button variant="danger mr-2" :disabled="isLoading" @click="del">
          <b-spinner small type="grow" v-show="isLoading"></b-spinner>
          Delete
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    modalId: {
      type: String,
      required: true,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    title: String,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    del() {
      this.$emit("ok", this.loading);
    },
    cancel() {
      this.$emit("cancel");
      this.$bvModal.hide(this.modalId);
    },
    loading(state) {
      this.isLoading = state;
    },
  },
};
</script>
