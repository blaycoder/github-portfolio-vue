<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import Modal from './components/Modal.vue';

let showModal = ref(false);
const showModalFn = (e)=>{
  e.preventDefault();
  showModal.value = !showModal.value;
  if(e.key == 'Escape'){
    showModal.value = false;
  }
}

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="p-2">Home</RouterLink>
        <button id="createRepoBtn" @click="showModalFn" @keyup="showModalFn">Create a repo</button>
        <div v-if="showModal"><Modal/></div>
        <!-- <Modal/> -->
      </nav>
      <RouterView />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

#createRepoBtn{
  color: yellow;
  background-color: black;
  padding: 0.5em;
  border-radius: 1em;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
