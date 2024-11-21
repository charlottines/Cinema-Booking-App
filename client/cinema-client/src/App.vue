<!-- App.vue -->
<template>
  <div id="app">
    <header>
      <div class="logo">
        <router-link to="/">CineMaBaguette</router-link>
      </div>
      <nav>
        <router-link to="/order-food">MIAM</router-link>
        <router-link to="/profile"><img src="@/assets/account-icon.png" alt="Login"></router-link>
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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  font-family: "Arial", sans-serif;
  background: linear-gradient(110deg, #050505 40%, #333 100%);
  /* background: linear-gradient(110deg, #001 40%, #00a 100%);*/
  background-size: cover;
  background-attachment: scroll;
  color: #ccc;
  font-size: large;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}


header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  padding: 1rem;
  color: #ddd;
}

header .logo a {
  color: #ddd;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
}

header img {
  height: 2rem;
}

nav {
  display: flex;
  align-items: center;
}

nav a {
  margin: 0 1rem;
  color: #f3f4f6;
  text-decoration: none;
  display: flex;
  align-items: center;
}

nav a:hover {
  text-decoration: underline;
}
</style>
