<template>
  <div class="container-fluid p-2">
    <p class="c-profile-overview__notification bg-light p-3 text-dark">
      <i class="fas fa-running"></i>
      <span class="ml-2">Time is running out, you should run too!</span>
    </p>
    <div class="row">
      <div class="col-md-2">
        <div class="c-activity-card bg-warning py-3 px-4 text-light">
          <h1 class="m-0"><i class="fas fa-fire"></i></h1>
          <h1 class="m-0">320K</h1>
          <p class="m-0 text-black">Calories Burnt</p>
        </div>
      </div>
      <div class="col-md-2">
        <div class="c-activity-card bg-primary py-3 px-4 text-light">
          <h1 class="m-0"><i class="fas fa-dumbbell"></i></h1>
          <h1 class="m-0">20+</h1>
          <p class="m-0 text-black">Exercises</p>
        </div>
      </div>
      <div class="col-md-2">
        <div class="c-activity-card bg-success py-3 px-4 text-light">
          <h1 class="m-0"><i class="fas fa-award"></i></h1>
          <h1 class="m-0">42 Days</h1>
          <p class="m-0 text-black">Longest Streak</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileOverview",

  data: () => ({
    profileInfo: {
      name: {
        name: String,
        data: String,
      },
      age: {
        name: String,
        data: String,
      },
      birthdate: {
        name: String,
        data: String,
      },
      location: {
        name: String,
        data: String,
      },
    },
  }),

  async created() {
    // Profile info mock
    const pinfo = {
      birthdate: new Date("1999-06-19"),
      name: "Abdelrahman Farid",
      age: 21,
    };

    // Date of Birth
    const dob = pinfo.birthdate;

    this.profileInfo = {
      name: {
        name: "Name",
        data: pinfo.name,
      },
      age: {
        name: "Age",
        data: pinfo.age,
      },
      birthdate: {
        name: "Date of Birth",
        data: this.dateToString(dob),
      },
      location: {
        name: "Location",
        data: "Maadi, Cairo, Egypt",
      },
    };
  },

  methods: {
    dateToString(date) {
      return `${date.getUTCDate()}/${
        date.getUTCMonth() + 1
      }/${date.getUTCFullYear().toString().substr(2, 2)}`;
    },
  },
};
</script>

<style></style>


<style lang="scss" scoped>
.c-profile-overview__notification {
  border-radius: $border-radius;
}
.c-activity-card {
  border-radius: $border-radius;
}
</style>