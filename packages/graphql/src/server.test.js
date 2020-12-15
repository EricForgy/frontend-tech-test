const { rest } = require("msw");
const gql = require("graphql-tag");
const { setupServer } = require("msw/node");
const { createTestClient } = require("apollo-server-testing");

const { server } = require("./server");

const { query } = createTestClient(server);

const github = setupServer(
  rest.get("https://api.github.com/repos/foo/bar", (_req, res, ctx) => {
    return res(ctx.json({ stargazers_count: 87 }));
  })
);

beforeAll(() => {
  github.listen();
});

afterAll(() => {
  github.close();
});

describe("GraphQL Server", () => {
  const TEST_QUERY = gql`
    query testQuery {
      repository(username: "foo", repository: "bar") {
        stars
      }
    }
  `;

  it("returns the expected data", () => {
    return expect(query({ query: TEST_QUERY })).resolves.toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          repository: expect.objectContaining({
            stars: 87,
          }),
        }),
      })
    );
  });
});
