<script setup>
import { defineProps } from 'vue'
defineProps({
  repos: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  totalPages: null
})
</script>

<template>
  <section>
    <h2 class="text-lg font-bold underline">Repo List</h2>
    <p v-if="!repos.length">No repositories found.</p>
    <ul>
      <li v-for="repo in repos" :key="repo.id" class="text-base p-1">
        <router-link
        v-if="repo.owner && repo.owner.login"
          :to="{ name: 'SingleRepoView', params: { id: repo.name, name: repo.owner.login } }"
        >
          {{ repo.name }}
        </router-link>
        <span v-else>
          {{ repo.name }}
        </span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>