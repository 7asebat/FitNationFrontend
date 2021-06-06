<template>
  <div>
    <div v-b-visible="xlSet" class="d-xl-none c-detector" />
    <div v-b-visible="lgSet" class="d-lg-none c-detector" />
    <div v-b-visible="mdSet" class="d-md-none c-detector" />
    <div v-b-visible="smSet" class="d-sm-none c-detector" />
    <div
      class="p-4 my-2 rounded h1 text-center text-light bg-primary"
      style="min-width: 180px"
      v-show="visible"
    >
      {{ breakpoint }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BreakpointDetector",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    breakpoint: "",
    breakpoints: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true,
    },
  }),

  methods: {
    setBreakpoint() {
      this.breakpoint = Object.keys(this.breakpoints).find(
        (bp) => this.breakpoints[bp] === false
      );

      if (!this.breakpoint) {
        this.breakpoint = "xs";
      }
      this.$emit("change", this.breakpoint);
    },
    xlSet(isVisible) {
      this.breakpoints.xl = isVisible;
      this.setBreakpoint();
    },
    lgSet(isVisible) {
      this.breakpoints.lg = isVisible;
      this.setBreakpoint();
    },
    mdSet(isVisible) {
      this.breakpoints.md = isVisible;
      this.setBreakpoint();
    },
    smSet(isVisible) {
      this.breakpoints.sm = isVisible;
      this.setBreakpoint();
    },
  },
};
</script>

<style scoped lang="scss">
.c-detector {
  z-index: 20000;
  height: 0;
}
</style>
