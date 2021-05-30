<template>
  <div>
    <b-tabs pills card vertical>
      <b-tab v-for="day in days" :key="day.name" :title="day.name">
        <div class="row">
          <div
            class="col-sm-12 col-md-4 col-lg-3"
            v-for="exercise in day.exercises"
            :key="exercise.name"
          >
            <ExerciseCard :data="exercise" />
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [
        {
          name: "Day 1",
          exercises: [
            {
              name: "Leg Raises",
              time: 30,
              calories: 120,
              imgSrc: "beHealthy.png",
            },
            {
              name: "Leg Raises",
              time: 30,
              calories: 120,
              imgSrc: "stayFit.png",
            },
          ],
        },
        {
          name: "Day 2",
          exercises: [],
        },
        {
          name: "Day 3",
          exercises: [],
        },
        {
          name: "Day 4",
          exercises: [],
        },
        {
          name: "Day 5",
          exercises: [],
        },
        {
          name: "Day 6",
          exercises: [],
        },
      ],
    };
  },

  components: {
    ExerciseCard: () => import("@/components/ExerciseCard.vue"),
  },
};
</script>