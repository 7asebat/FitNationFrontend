<template>
  <div class="container">
    <div class="row">
      <div id="side-image" class="col">
        <img src="../assets/weightLiftingVector.png" class="img-fluid" />
      </div>
      <div id="signup-form" class="col">
        <form action="">
          <div id="signup-text">
            <div id="signup-text-header">
              <h1 style="margin-right: 0.5rem">Sign Up for an</h1>
              <h1 style="color: rgb(216, 74, 74)">Account</h1>
            </div>
            <h4>Healthy habits for a better life.</h4>
          </div>

          <input
            id="fullname-input"
            type="text"
            class="form-control"
            placeholder="Full name"
            aria-label="Full name"
            v-model="fullname"
          />

          <input
            id="email-input"
            type="text"
            class="form-control"
            placeholder="Email Address"
            aria-label="Email Address"
            v-model="email"
          />

          <input
            id="email-input"
            type="password"
            class="form-control"
            placeholder="Password"
            aria-label="Password"
            v-model="password"
          />

          <button class="btn btn-primary signup-btn" v-on:click="submitForm">
            Create Account
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fullname: "",
      email: "",
      password: "",
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

      await axios.post(
        "http://localhost:3000/authentication/clients/sign_up",
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

input {
  background-color: rgb(247, 247, 247);
  border-radius: 25px;
  border-color: transparent;
  margin-bottom: 15px;
  height: 3.2rem;
  text-indent: 20px;
  color: #555;
}
input::placeholder {
  color: #bbb;
  margin: 50px;
  text-indent: 20px;
}

#signup-text {
  margin-bottom: 40px;
}

#signup-form {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.signup-btn {
  background-color: rgb(216, 74, 74);
  border-color: transparent;
  border-radius: 20px;
}

#side-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

#signup-text-header {
  display: flex;
}
</style>