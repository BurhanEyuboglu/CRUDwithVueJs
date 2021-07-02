import Vue from "vue";
import axios from "axios";

const client = axios.create({
  baseURL: "https://localhost:5001/api/ToDo",
  json: true,
});

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data,
    }).then((req) => {
      return req.data;
    });
  },
  getAll() {
    return this.execute("get", "/");
  },
  create(data) {
    if (data.description && data.isComplete)
      return this.execute("post", "/", data)
    else return this.message();
  },
  update(id, data) {
    if (data.description && data.isComplete) 
    return this.execute("put", `/${id}`, data);
    else {
      return this.message();
    }
  },
  delete(id) {
    return this.execute("delete", `/${id}`);
  },
  message() {
    alert("Description or isCom can not be empty!");
  }
};

