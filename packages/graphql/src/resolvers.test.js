const resolvers = require("./resolvers");

it("exports the correct resolvers", () => {
  expect(resolvers).toEqual({
    Query: {
      repository: expect.any(Function),
    },
  });
});

describe("Query.repository", () => {
  const { repository } = resolvers.Query;

  let gitHubAPI;

  let args;

  beforeEach(() => {
    gitHubAPI = {
      getRepository: jest.fn(async () => ({
        stargazers_count: 32,
      })),
    };
  });

  beforeEach(() => {
    args = {
      username: "test",
      repository: "foobar",
    };
  });

  it("retrieves the correct data", () => {
    return expect(
      repository(null, args, { dataSources: { gitHubAPI } })
    ).resolves.toEqual({
      stars: 32,
    });
  });
});
