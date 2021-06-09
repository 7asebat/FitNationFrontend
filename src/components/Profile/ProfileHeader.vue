<template>
  <div>
    <div class="c-profile__user-info text-center my-5">
      <div class="c-profile-header__profile-pic">
        <label
          for="profilePic"
          class="d-block c-profile-header__profile-pic--overlay m-0"
        >
          <i class="far fa-edit text-light h3 m-0"></i>
        </label>

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
        <input
          type="file"
          id="profilePic"
          class="d-none"
          @change="updateAvatar"
        />
      </div>

      <div class="my-3">
        <h3>{{ loggedInUser.name }}</h3>
        <p class="m-0 text-secondary">{{ loggedInUser.email }}</p>
        <span
          class="px-3 my-2 d-inline-block text-light round-corner"
          :class="{
            'bg-success': loggedInUser.role === 'nutritionist',
            'bg-info': loggedInUser.role === 'client',
            'bg-primary': loggedInUser.role === 'trainer',
          }"
        >
          {{ loggedInUser.role }}
        </span>
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

  methods: {
    async updateAvatar(e) {
      try {
        const avatar = e.target.files || e.dataTransfer.files;
        if (!avatar) return;

        const payload = new FormData();
        payload.append("avatar", avatar[0]);

        await this.axios.patch("me/avatar", payload);
        this.$notification(
          "successNotification",
          "Profile pic updated successfully!"
        );
        await this.updateLoggedInUser();
      } catch (err) {
        this.$errorsHandler(err);
      }
    },

    async updateLoggedInUser() {
      try {
        const response = await this.axios.get("authentication/current_user");
        const user = response.data.data.user;

        this.$store.commit("setUser", user);
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.c-profile-header__profile-pic {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.c-profile-header__profile-pic:hover .c-profile-header__profile-pic--overlay {
  opacity: 1;
  visibility: visible;
}

.c-profile-header__profile-pic--overlay {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  line-height: 150px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

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
