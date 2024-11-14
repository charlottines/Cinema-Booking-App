<!-- Register.vue -->
<template>
    <div class="auth-form">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <label>Email</label>
        <input type="email" v-model="email" required />
        <label>Password</label>
        <input type="password" v-model="password" required />
        <label>Confirm Password</label>
        <input type="password" v-model="confirmPassword" required />
        <button type="submit">Register</button>
        <p>
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </p>
      </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Account created for ${this.email}`);
    },
  },
};
</script>

<style scoped>
  .auth-form {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.auth-form h1 {
  margin-bottom: 1rem;
}

.auth-form form {
  display: flex;
  flex-direction: column;
}

.auth-form label {
  text-align: left;
  margin-top: 1rem;
}

.auth-form input {
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.auth-form button {
  background-color: #ff4500;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.auth-form button:hover {
  background-color: #e63e00;
}

p a {
  color: #fd2;
  text-decoration: none;
}
</style>
  