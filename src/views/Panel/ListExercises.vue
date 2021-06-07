<template>
  <div>
    <b-card class="overflowHidden border-0 shadow-sm">
      <div class="d-flex itemsHeader">
        <div>
          <h2>Exercise</h2>
          <p class="text-secondary">A list of all the exercise items</p>
        </div>
        <div>
          <button class="btn btn-success" v-b-modal="'addExerciseModal'">
            <i class="fas fa-plus"></i>
            <span class="ml-2">Add Exercise</span>
          </button>
        </div>
      </div>
      <b-table
        striped
        responsive
        hover
        :items="exercises"
        :fields="[
          'id',
          'name',
          'tips',
          {
            key: 'meta_data',
            label: 'Targeted Muscles',
            formatter: 'formatExerciseType',
          },
          'actions',
        ]"
        :busy="isLoading"
      >
        <template v-slot:cell(actions)="data">
          <b-button
            variant="danger mr-2"
            v-b-modal="'deleteExercise'"
            @click="exerciseToDelete = data.item"
          >
            <i class="fas fa-trash"></i>
          </b-button>
        </template>

        <template v-slot:table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle mr-3"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </b-card>

    <DeleteModal
      modalId="deleteExercise"
      title="Delete Exercise"
      @ok="deleteExercise"
      @cancel="exerciseToDelete = null"
    >
      you are going to delete the following exercise :
      <b>{{ exerciseToDelete ? exerciseToDelete.name : "" }}</b
      >. <br />Are you sure ?
    </DeleteModal>

    <AddExerciseModal @addedExercise="(exercise) => exercises.push(exercise)" />
  </div>
</template>

<script>
export default {
  created() {
    this.getExercises(1);
  },
  data() {
    return {
      isLoading: false,
      exercises: [],
      exerciseToDelete: "",
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getExercises() {
      this.isLoading = true;
      try {
        const response = await this.axios.get("exercises");
        const { exercises } = response.data.data;

        this.exercises = exercises;
      } catch (err) {
        this.$errorsHandler(err);
      }
      this.isLoading = false;
    },
    async deleteExercise() {
      try {
        const id = this.exerciseToDelete.id;
        await this.axios.delete(`exercises/${id}`);

        this.exercises = this.exercises.filter(
          (exercise) => exercise.id !== id
        );

        this.$bvModal.hide("deleteExercise");
        this.$notification(
          "successNotification",
          `Exercise: ${this.exerciseToDelete.name} has been deleted successfully!`
        );

        this.exerciseToDelete = null;
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
    formatExerciseType(exerciseMetaData) {
      if (exerciseMetaData && exerciseMetaData.muscle_groups) {
        const muscleIds = exerciseMetaData.muscle_groups;
        const muscles = this.$store.state.enums.muscles;

        return muscleIds.map((id) => muscles[id]).join(",");
      }

      return "";
    },
  },

  components: {
    DeleteModal: () => import("@/components/common/DeleteModal"),
    AddExerciseModal: () => import("@/components/Panel/AddExerciseModal"),
  },
};
</script>

<style lang="scss" scoped>
.itemsHeader {
  justify-content: space-between;
  align-items: center;
}
.addExercise {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  font-size: 25px;
  position: fixed;
  bottom: 30px;
  right: 30px;
}
.overflowHidden {
  overflow: hidden;
}
</style>
