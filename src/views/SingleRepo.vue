<script setup>
defineProps(['repo'])
</script>

<template>
  <div>
    <h1>{{ repo.name}}</h1>
    <p>Repo ID: {{ repo.id}}</p>
  </div>
</template>