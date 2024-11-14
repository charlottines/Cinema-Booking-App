<!-- App.vue -->
<template>
  <div id="app">
    <header>
      <div class="logo">
        <router-link to="/">CinemaApp</router-link>
      </div>
      <nav>
        <router-link to="/order-food">MIAM</router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  color: #333;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #24292e;
  padding: 1rem;
  color: white;
}

header .logo a {
  color: #f3f4f6;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
}

nav a {
  margin: 0 1rem;
  color: #f3f4f6;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 2rem;
}
</style>
