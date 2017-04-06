import axios from 'axios'

export function getGanks (category) {
  return axios.get(`http://gank.io/api/data/${category}/20/1`)
}