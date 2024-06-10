import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
    Accept: 'application/vnd.github+json',
    Authorization: import.meta.env.VITE_REACT_APP_GITHUB_API
      ? `Bearer ${import.meta.env.VITE_REACT_APP_GITHUB_API}`
      : undefined
  }
})

export default {
  getUser(name) {
    return api.get(`/users/${name}`);
  },
  getRepos(name, options = {}) {
    return api.get(`/users/${name}/repos`, {
      params: {
        sort: 'updated',
        direction: 'desc',
        per_page: 10,
        ...options
      }
    });
  },
  getRepo(name, repo) {
    return api.get(`/repos/${name}/${repo}`);
  },
};