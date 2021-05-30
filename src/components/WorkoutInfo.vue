<template>
  <div>
    <div class="row">
      <div class="col-lg-6 col-sm-12 mb-4">
        <img src="@/assets/images/workout.png" class="w-100" alt="" />
      </div>
      <div class="col-lg-6 col-sm-12">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="u-title-font">{{ workout.title }}</h1>
          <button class="btn btn-primary">Choose this workout</button>
        </div>
        <p class="text-secondary">
          {{ workout.description }}
        </p>

        <p class="my-1 c-workout-card-workout-property">
          <span class="text-warning"><i class="fas fa-signal"></i></span>
          <span class="mx-2 text-dark">{{ workout.level }}</span>
        </p>

        <p class="my-1 c-workout-card-workout-property">
          <span class="text-danger"><i class="fas fa-fire"></i></span>
          <span class="mx-2 text-dark"
            >{{ workout.calories }} Est. calories</span
          >
        </p>
        <p class="my-1 c-workout-card-workout-property">
          <span class="text-danger"><i class="fas fa-running"></i></span>
          <span class="mx-2 text-dark">{{ workout.exercises }} Exercises</span>
        </p>
        <p class="my-1 c-workout-card-workout-property">
          <span class="text-danger"><i class="fas fa-dumbbell"></i></span>
          <span class="mx-2 text-dark">
            {{
              workout.equipmentsRequired
                ? "Equipments Required"
                : "Equipments Not Required"
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workout: {
      required: true,
    },
  },
};
</script>