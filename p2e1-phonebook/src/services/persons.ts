import axios from "axios";
import type { PersonDetails } from "../utils/types";

const baseUrl = "http://localhost:3000/persons";

async function all() {
  return await axios.get<PersonDetails[]>(baseUrl).then((response) => response.data);
}

async function add(newPerson: PersonDetails) {
  return await axios.post<PersonDetails>(baseUrl, newPerson).then((response) => response.data)
}

function edit() {

}

function del() {

}


export default {
  all,
  add,
  edit,
  del
}