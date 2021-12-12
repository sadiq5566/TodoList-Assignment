import http from "../http-common";

class ChildTodoDataService {
  getAll() {
    return http.get("/childtodos");
  }

  create(data) {
    return http.post("/childtodos", data);
  }

  update(id, data) {
    return http.patch(`/childtodos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/childtodos/${id}`);
  }
  toggleComplete(id, data) {
    return http.patch(`/childtodosToggle/${id}`, data);
  }
}

export default new ChildTodoDataService();