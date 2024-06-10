<script setup>
import { onMounted, reactive, ref, watchEffect, computed } from 'vue'
import api from '../services/api'
import RepoList from './RepoList.vue'
import Pagination from './RepoPagination.vue'
import { parseLinkHeader, extractPageNumber } from '@/utils'

const username = ref('blaycoder')
const github = reactive({
  user: null,
  repos: [],
  links: null,
  totalPages: 0,
  currentPage: 1
})

const props = defineProps(['page'])

const page = computed(() => props.page || 1)
let loading = ref(true);

const hasNextPage = computed(() => {
  const totalPages = github.totalPages
  return page.value < totalPages
})

async function fetchRepos(page) {
  try {
    const repos = await api.getRepos(username.value, { page: page })
    github.repos = repos.data;
    github.links = repos.headers.link;
    const parsedLink = parseLinkHeader(repos.headers.link);
    github.totalPages = extractPageNumber(parsedLink?.last) || 1;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching repositories:', error)
  }
}

onMounted(() => {
  watchEffect(() => {
    api.getUser(username.value).then((user) => {
      github.user = user.data
    })
    fetchRepos(page.value)
  })
})
</script>

<template>
  <section>
    <div class="main-container">
      <div class="owner-profile-container">
        <h2 class="text-3xl font-bold">Welcome to my GitHub Repositories</h2>
        <p v-if="!github && loading">Loading...</p>
        <div v-if="github.user" class="profile-content">
          <div class="profile-img">
            <img :src="github.user.avatar_url" alt="User avatar" loading="lazy" />
          </div>
          <div class="details">
            <h2 class="text-lg">{{ github.user.name }}</h2>
            <h3>Github Username: {{ github.user.login }}</h3>
            <h3>Total Repositories: {{ github.user.public_repos }}</h3>
            <h3>{{ github.user.followers }} followers | {{ github.user.following }} following</h3>
            <h3>Twitter Username: {{ github.user.twitter_username }}</h3>
            <p> <span><strong>Short Bio:</strong></span> {{ github.user.bio }}</p>
          </div>
        </div>
      </div>

      <div class="repo-container">
      <div class="repo-list-container">
        <RepoList :repos="github.repos" :totalPages="github.totalPages" />
        <Pagination :totalPages="github.totalPages" @fetchRepo="(n) => fetchRepos(n)" />
        <div class="pagination text-sm">
          <router-link
            id="page-prev"
            :to="{ path: '/', query: { page: page - 1 } }"
            rel="prev"
            v-if="page != 1"
            >&#60; Previous</router-link
          >

          <router-link
            id="page-next"
            :to="{ path: '/', query: { page: page + 1 } }"
            rel="next"
            v-if="hasNextPage"
            >Next &#62;</router-link
          >
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-container {
  font-size: 85%;
  font-family: 'JetBrains Mono', monospace;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* gap: 1em; */
  margin: auto;
  background-color: #204c68;
  color: #fff;

  h2 {
    font-size: 1.5em;
    font-weight: 700;
  }
}

.owner-profile-container {
  padding: 20px 70px 20px 20px;
  border-right: 1px solid #ffffff5e;
  margin: 0 auto;

  .profile-content {
    padding: 2em;
  }
  .details {
    padding: 1em;
  }
}

.repo-list-container {
  width: 60%;
  padding: 20px 70px 20px 20px;
  margin: auto;
 
}

.repo-container{
 background-color: #011c2d;
}

.pagination {
  display: flex;
}
.pagination a {
  flex: 1;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    background-color: transparent;
  }
}

.profile-img {
  width: 200px;
  height: 200px;

  img {
    width: 100%;
    block-size: auto;
    object-fit: cover;
    border-radius: 50%;
  }
}

/* #page-prev {
}

#page-next {
} */

@media screen and (max-width: 1000px){
  .main-container {
    grid-template-columns: 1fr;
  }
  .repo-list-container{
    width: 100%;
    padding: 20px;
  }
}

</style>
