import { setupServer } from "msw/node";
import { useQuery, gql } from "@apollo/client";
import { graphql } from "msw";

import { waitFor, render } from "../../testUtils";

import { Provider } from ".";

const server = setupServer(
  graphql.query("useTestData", (_req, res, ctx) => {
    return res(
      ctx.data({
        names: ["David", "Joe", "Max"],
      })
    );
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("<Provider/>", () => {
  let res;

  const TEST_QUERY = gql`
    query useTestData {
      names
    }
  `;

  const TestComponent = () => {
    res = useQuery(TEST_QUERY);

    if (res.loading) {
      return null;
    }

    return <h1 data-testid="title">title</h1>;
  };

  it("fetches query data", async () => {
    const { getByTestId } = render(
      <Provider>
        <TestComponent />
      </Provider>
    );

    await waitFor(() => expect(getByTestId("title")).toBeInTheDocument());

    expect(res).toEqual(
      expect.objectContaining({
        loading: false,
        data: expect.objectContaining({
          names: expect.arrayContaining(["David"]),
        }),
      })
    );
  });
});
