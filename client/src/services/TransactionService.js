import http from "../http-common";
const getAll = (date) => {
   return http.get(`?period=${date}`)
}
const findOne = (id) => {
   return http.get(`/find/${id}`)
}
const create = (data) => {
   return http.post('/add', data)
}
const remove = (id) => {
   return http.delete(`/remove/${id}`)
}

const update = (id, report) => {
   return http.put(`/att/${id}`, report)
}

export default { getAll, create, remove, findOne, update };