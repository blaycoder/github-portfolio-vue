<script setup>
defineProps(['repo'])
</script>

<template>
  <div>
    <h1 class="font-bold underline text-lg">Repo Details</h1>
    <!-- {{ repo }} -->
    <p>Repo ID: {{ repo.name }}</p>
    <p>Repo Owner: {{ repo.owner.login }}</p>
    <p>Repo Description: {{ repo.description ?? 'empty'}}</p>
    <p>Fork: {{ repo.fork }}</p>
  </div>
</template>