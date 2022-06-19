import HttpService from "./HttpService";

class UserService extends HttpService {
  async getAllUsers() {
    return await this.sendRequest({
      method: "GET",
      url: "/user",
      responseType: "json",
    });
  }

  async addUser(payload) {
    return await this.sendRequest({
      method: "POST",
      url: `/user`,
      responseType: "json",
      data: payload,
    });
  }

  async updateUser(payload, id) {
    return await this.sendRequest({
      method: "PATCH",
      url: `/user/${id}`,
      responseType: "json",
      data: payload,
    });
  }

  async deleteUser(id) {
    return await this.sendRequest({
      method: "DELETE",
      url: `/user/${id}`,
      responseType: "json",
    });
  }
}

const userService = new UserService();
export default userService;
