const { rest } = require("msw");
const fetch = require("node-fetch");
const { setupServer } = require("msw/node");

const sources = require("./data-sources");

const { REST_SOURCE_URL } = process.env;

const server = setupServer(
  rest.get("https://api.github.com/repos/foo/bar", (_req, res, ctx) => {
    return res(ctx.json({ stargazers_count: 34 }));
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

let api;

describe("GitHubAPI", () => {
  const { GitHubAPI } = sources;

  beforeEach(() => {
    api = new GitHubAPI();
    api.httpCache = { fetch };
  });

  describe("#getRepository", () => {
    it("returns the correct response", () => {
      return expect(api.getRepository("foo", "bar")).resolves.toEqual(
        expect.objectContaining({
          stargazers_count: 34,
        })
      );
    });
  });
});
