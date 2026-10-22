import axios from "axios";
import type { PersonDetails } from "../utils/types";

const baseUrl = "http://localhost:3000/persons";

async function all() {
  return await axios.get<PersonDetails[]>(baseUrl).then((response) => response.data);
}

async function add(newPerson: PersonDetails) {
  return await axios.post<PersonDetails>(baseUrl, newPerson).then((response) => response.data)
}

async function edit(newPerson: PersonDetails) {
  return await axios.put<PersonDetails>(`${baseUrl}/${newPerson.id}`,newPerson).then(res => res.data);
}

async function del(id:string) {
  return await axios.delete<PersonDetails>(`${baseUrl}/${id}`).then(res => res.data);
}


export default {
  all,
  add,
  edit,
  del
}