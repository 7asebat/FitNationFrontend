<template>
  <div id="component-container">
    <div class="container">
      <div class="row">
        <div id="signup-form" class="col-lg-6 col-sm-12 text-center my-4">
          <form action="" class="needs-validation">
            <div id="signup-text" class="mb-4">
              <div id="signup-text-header">
                <h1 class="c-signup-title u-title-font text-center">
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
              <button class="btn btn-primary px-5" v-on:click="submitForm">
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
import axios from "axios";

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
        { text: "Nutrionist", value: "nutrionist" },
      ],
    };
  },
  methods: {
    async submitForm() {
      let role = Number(this.userRole);
      let resource_url = "";

      switch (role) {
        case 0:
          resource_url = "clients/sign_up";
          break;
        case 1:
          resource_url = "trainers/sign_up";
          break;
        case 2:
          resource_url = "nutritionists/sign_up";
          break;
        default:
          break;
      }

      const payload = {
        email: this.email,
        password: this.password,
        name: this.name,
        country: 0,
      };

      await axios.post(
        `http://localhost:3000/authentication/${resource_url}`,
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