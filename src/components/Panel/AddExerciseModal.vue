<template>
  <b-modal
    id="addExerciseModal"
    scrollable
    size="md"
    :title="`Add exercise to recipe`"
    :ok-title="`Add Selected Exercise`"
    @ok="addExercise"
  >
    <b-form-input
      v-model="name"
      placeholder="Exercise Name"
      class="mb-3"
    ></b-form-input>

    <b-form-input
      v-model="tips"
      placeholder="Exercise Tips"
      class="mb-3"
    ></b-form-input>

    <b-form-file
      v-model="image"
      :state="Boolean(image)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>

    <b-form-select v-model="muscle" :options="muscles"></b-form-select>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      tips: "",
      muscle: 0,
      image: undefined,
    };
  },

  computed: {
    muscles() {
      const muscles = this.$store.state.enums.muscles;
      return Object.keys(muscles).map((key) => ({
        value: key,
        text: muscles[key],
      }));
    },
  },

  methods: {
    async addExercise() {
      try {
        const payload = {
          exercise: {
            name: this.name,
            tips: this.tips,
            meta_data: {
              muscle_groups: [Number(this.muscle)],
            },
          },
        };

        const response = await this.axios.post("exercises", payload);
        const exercise = response.data.data.exercise;

        if (this.image) {
          const payload = new FormData();
          payload.append("image", this.image);
          try {
            const response = await this.axios.patch(
              `exercises/${exercise.id}/image`,
              payload
            );
            response;
          } catch (err) {
            this.$errorsHandler(new Error("Failed to upload exercise image!"));
          }
        }

        this.$emit("addedExercise", exercise);
        this.$notification(
          "successNotification",
          `Exercise: ${this.name} added successfully`
        );
        this.resetForm();
      } catch (err) {
        this.$errorsHandler(err);
      }
    },

    resetForm() {
      this.name = "";
      this.nutritionFacts = "";
      this.exerciseType = 0;
    },
  },
};
</script>