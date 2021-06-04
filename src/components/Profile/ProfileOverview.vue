<template>
  <div class="container-fluid p-2">
    <table class="table table-borderless">
      <tr v-for="(entry, i) in profileInfo" :key="i">
        <th scope="row">{{ entry.name }}</th>
        <td>{{ entry.data }}</td>
      </tr>
    </table>
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
      return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date
        .getUTCFullYear()
        .toString()
        .substr(2, 2)}`;
    },
  },
};
</script>

<style></style>
