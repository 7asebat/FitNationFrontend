<template>
  <div class="c-workout-card">
    <div class="c-workout-card-workout-info">
      <h3 class="text-light c-workout-card-workout-title">Body balance</h3>
      <p class="my-1 c-workout-card-workout-property">
        <span class="text-warning"><i class="fas fa-signal"></i></span>
        <span class="mx-2 text-light">{{ level }}</span>
      </p>

      <p class="my-1 c-workout-card-workout-property">
        <span class="text-danger"><i class="fas fa-fire"></i></span>
        <span class="mx-2 text-light">{{ calories }} Est. calories</span>
      </p>
      <p class="my-1 c-workout-card-workout-property">
        <span class="text-danger"><i class="fas fa-running"></i></span>
        <span class="mx-2 text-light">{{ exercisesNumber }} Exercises</span>
      </p>
      <p class="my-1 c-workout-card-workout-property">
        <span class="text-danger"><i class="fas fa-dumbbell"></i></span>
        <span class="mx-2 text-light">
          {{
            equipmentsRequired
              ? "Equipments Required"
              : "Equipments Not Required"
          }}
        </span>
      </p>
    </div>

    <div class="c-workout-card-black-overlay"></div>
    <img
      src="@/assets/images/workout.png"
      alt=""
      class="c-workout-card-image"
    />
  </div>
</template>

<script>
export default {
  props: {
    level: String,
    calories: Number,
    exercisesNumber: Number,
    equipmentsRequired: Boolean,
    image: String,
  },
};
</script>

<style lang="scss" scoped>
.c-workout-card {
  position: relative;
  height: 300px;
  border-radius: 25px;
  overflow: hidden;
  cursor: pointer;
}

.c-workout-card:hover .c-workout-card-image {
  transform: scale(1.05);
}

.c-workout-card-workout-title {
  font-family: "Bebas Neue", cursive;
}

.c-workout-card-workout-property {
  font-size: 12px;
}

.c-workout-card-black-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.8));
  z-index: 2;
}

.c-workout-card-image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: all 0.3s;
}

.c-workout-card-workout-info {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 3;
}
</style>