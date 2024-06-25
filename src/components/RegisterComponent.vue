<template>
  <div class="register-form">
    <form @submit.prevent="register">
      <div class="form-field">
        <label for="username">Username</label>
        <input id="username" v-model="form.username" type="text" required />
      </div>

      <div class="form-field">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="form-field">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" required />
      </div>

      <div class="form-field">
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" v-model="form.confirmPassword" type="password" required />
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const form = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const register = () => {
      if (form.value.password !== form.value.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Form Submitted', form.value);
    };

    return {
      form,
      register,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.register-form {
  font-family: 'Poppins', sans-serif;
  max-width: 500px;
  margin: auto;
  margin-top: 5%;
  padding: 2rem;
  border: 1px solid #202020;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
}

.form-field {
  margin-bottom: 1rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-field input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  color: black;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #323436;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

button:hover {
  background-color: #18191a;
}
</style>
