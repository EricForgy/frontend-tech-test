const repository = async (_source, args, { dataSources }) => {
  const { gitHubAPI } = dataSources;

  const { username, repository } = args;

  const data = await gitHubAPI.getRepository(username, repository);

  const { stargazers_count: stars } = data;

  return {
    stars,
  };
};

exports.Query = {
  repository,
};
