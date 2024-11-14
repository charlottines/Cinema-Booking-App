<!-- Login.vue -->
<template>
    <div class="auth-form">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label>Email</label>
        <input type="email" v-model="email" required />
        <label>Password</label>
        <input type="password" v-model="password" required />
        <button type="submit">Login</button>
        <p>
          Don't have an account ?
          <router-link to="/register"> Register here</router-link>
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
      };
    },
    methods: {
      login() {
        // Simulate a login call
        alert(`Logged in with ${this.email}`);
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
  
  .auth-form h2 {
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
  </style>
  