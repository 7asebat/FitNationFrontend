<template>
  <div class="home container p-5">
    <h1>home</h1>

    <b-form-group
      label="Button style radios with outline-primary variant and size lg"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-radio-group
        id="btn-radios-2"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        button-variant="outline-primary"
        size="lg"
        name="radio-btn-outline"
        buttons
      ></b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "radio1",
      options: [
        { text: "Radio 1", value: "radio1" },
        { text: "Radio 3", value: "radio2" },
        { text: "Radio 3 (disabled)", value: "radio3" },
        { text: "Radio 4", value: "radio4" },
      ],
    };
  },
};
</script>
