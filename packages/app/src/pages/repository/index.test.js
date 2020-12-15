import {
  render,
  graphql,
  createGraphQLProvider,
  waitFor,
} from "../../testUtils";

import Repository from ".";

const GraphQLProvider = createGraphQLProvider(
  graphql.query("getRepository", (req, res, ctx) => {
    const { username, repository } = req.variables;

    expect(username).toEqual(expect.stringMatching(/^[a-z]+$/i));
    expect(repository).toEqual(expect.any(String));

    return res(
      ctx.data({
        repository: {
          stars: 22,
        },
      })
    );
  })
);

const setup = (props = {}) => {
  return render(
    <GraphQLProvider>
      <Repository {...props} />
    </GraphQLProvider>
  );
};

describe("<Repository/>", () => {
  it("renders the repository information correctly", async () => {
    const { getByTestId } = setup({
      match: {
        params: {
          username: "foo",
          repository: "bar",
        },
      },
    });

    await waitFor(() => expect(getByTestId("title")).toBeInTheDocument());

    expect(getByTestId("repository")).toHaveTextContent("foo/bar");

    expect(getByTestId("stars")).toHaveTextContent("22");

    expect(getByTestId("related")).toBeInTheDocument();
  });
});
