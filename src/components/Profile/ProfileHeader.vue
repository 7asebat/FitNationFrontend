<template>
  <div>
    <div class="c-profile__user-info text-center my-5">
      <img
        v-if="loggedInUser.avatar"
        :src="loggedInUser.avatar"
        alt=""
        class="img c-profile-image"
      />
      <img
        v-else
        src="@/assets/images/defaultUser.png"
        alt=""
        class="img c-profile-image"
      />
      <div class="my-3">
        <h3>{{ loggedInUser.name }}</h3>
        <!-- <div class="d-flex justify-content-between">
          <div class="ml-4">
            <a href="#" class="btn btn-outline-primary">
              <i class="fas fa-user-edit"></i>
              <span class="ml-2">Edit Profile</span>
            </a>
          </div>
        </div> -->
        <p class="text-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
          necessitatibus dignissimos enim quam tempora.
        </p>
        <!-- <p class="mb-1">
          <i class="far fa-calendar-alt text-primary"></i>
          <span class="mx-2 text-secondary">15 May 1980 (21 years)</span>
        </p>
        <p class="mb-1">
          <i class="fas fa-map-marker-alt text-primary"></i>
          <span class="mx-2 text-secondary">Maadi, Cairo, Egypt</span>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedInUser() {
      // return { name: "Abdelrahman Farid" };
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped lang="scss">
.c-profile__user-info {
  max-width: 600px;
  margin-right: auto;
  margin-left: auto;
}

.c-profile-image {
  flex: 0 0 150px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
}
</style>
