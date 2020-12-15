const { RESTDataSource } = require("apollo-datasource-rest");

class GitHubAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.github.com";
  }

  async getRepository(username, repository) {
    return this.get(`/repos/${username}/${repository}`);
  }
}

const sources = {
  gitHubAPI: new GitHubAPI(),
};

module.exports = () => sources;

module.exports.GitHubAPI = GitHubAPI;
