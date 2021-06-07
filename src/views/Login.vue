<template>
  <div id="component-container">
    <div class="container">
      <div class="row">
        <div id="login-form" class="col-lg-6 col-sm-12 text-center my-4">
          <form action="" class="needs-validation">
            <div id="login-text" class="mb-4">
              <div id="login-text-header">
                <h1 class="c-login-title u-title-font text-center">
                  Login into your
                  <span class="text-primary">Account</span>
                </h1>
              </div>
              <p class="text-secondary">Healthy habits for a better life.</p>
            </div>

            <input
              type="email"
              class="form-control mb-3"
              placeholder="Email Address"
              aria-label="Email Address"
              v-model="email"
              required
            />

            <input
              type="password"
              class="form-control mb-3"
              placeholder="Password"
              aria-label="Password"
              v-model="password"
              required
            />

            <div>
              <button class="btn btn-primary px-5" @click.prevent="submitForm">
                Login
              </button>
            </div>
          </form>
        </div>

        <div id="side-image" class="col-lg-6 col-sm-12">
          <img src="@/assets/images/Login.png" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
  }),

  methods: {
    async submitForm() {
      try {
        const payload = {
          email: this.email,
          password: this.password,
        };

        const response = await this.axios.post(
          "authentication/sign_in",
          payload
        );
        const user = response.data.data.user;
        const token = response.data.data.token;

        this.$store.commit("setUser", user);
        this.$store.commit("setToken", token);
        this.$router.push({ name: "Index" });
      } catch (err) {
        this.$errorsHandler(err);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #555;
}
h4 {
  color: #999;
}

.c-login-title,
.c-login-title * {
}
/* 
input {
  background-color: rgb(247, 247, 247);
  border-radius: 25px;
  border-color: transparent;
  margin-bottom: 15px;
  height: 3.2rem;
  text-indent: 20px;
  color: #555;
} */
/* input::placeholder {
  color: #bbb;
  margin: 50px;
  text-indent: 20px;
} */

#user-type-radio {
  margin-bottom: 15px;
}

#component-container {
  margin-top: 10%;
}
</style>
