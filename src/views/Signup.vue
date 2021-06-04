<template>
  <div id="component-container">
    <div class="container">
      <div class="row">
        <div
          id="signup-form"
          class="col-lg-6 col-sm-12 order-sm-1 order-lg-2 text-center my-4"
        >
          <form action="" class="needs-validation">
            <div id="signup-text" class="mb-4">
              <div id="signup-text-header">
                <h1 class="c-signup-title u-title-font text-center">
                  Sign Up for an
                  <span class="text-primary">Account</span>
                </h1>
              </div>
              <p class="text-secondary">Healthy habits for a better life.</p>
            </div>

            <input
              id="fullname-input"
              type="text"
              class="form-control mb-3"
              placeholder="Full name"
              aria-label="Full name"
              v-model="name"
              required
            />

            <input
              id="email-input"
              type="email"
              class="form-control mb-3"
              placeholder="Email Address"
              aria-label="Email Address"
              v-model="email"
              required
            />

            <input
              id="email-input"
              type="password"
              class="form-control mb-3"
              placeholder="Password"
              aria-label="Password"
              v-model="password"
              required
            />

            <b-form-group>
              <b-form-radio-group
                id="btn-radios-2"
                v-model="userRole"
                :options="userTypes"
                button-variant="outline-primary"
                name="radio-btn-outline"
                buttons
              ></b-form-radio-group>
            </b-form-group>

            <div>
              <button class="btn btn-primary" v-on:click.prevent="submitForm">
                Create Account
              </button>
            </div>
          </form>
        </div>

        <div id="side-image" class="col-lg-6 col-sm-12 order-sm-2 order-lg-1">
          <img src="../assets/weightLiftingVector.png" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      userRole: "client",
      userTypes: [
        { text: "Client", value: "client" },
        { text: "Trainer", value: "trainer" },
        { text: "Nutritionist", value: "nutritionist" },
      ],
    };
  },
  methods: {
    async submitForm() {
      const payload = {
        email: this.email,
        password: this.password,
        name: this.name,
        country: 0,
      };

      await this.axios.post(
        `authentication/${this.userRole}s/sign_up`,
        payload
      );
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

.c-signup-title,
.c-signup-title * {
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