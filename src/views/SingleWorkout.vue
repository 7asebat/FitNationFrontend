<template>
  <div>
    <div class="container">
      <WorkoutInfo :workout="workout" class="my-5" />
      <WorkoutExercises />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workout: {
        title: "Body Balance",
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex alias quos quod sunt sed fugiat magnam, labore excepturi id molestiae, facere assumenda unde nihil repellendus earum maxime eveniet ad blanditiis!",
        level: "Intermediate",
        calories: 1200,
        exercises: 12,
        equipmentsRequired: true,
      },
    };
  },
  components: {
    WorkoutInfo: () => import("@/components/WorkoutInfo.vue"),
    WorkoutExercises: () => import("@/components/WorkoutExercises.vue"),
  },
};
</script>