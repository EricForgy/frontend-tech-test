import { render } from "../../testUtils";

import { Page } from ".";

describe("<Page/>", () => {
  it("renders children", async () => {
    const { queryByTestId } = render(
      <Page>
        <h1 data-testid="title">title</h1>
      </Page>
    );

    expect(queryByTestId("title")).toBeInTheDocument();
  });
});
