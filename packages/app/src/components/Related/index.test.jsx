import { userEvent, render } from "../../testUtils";

import { Related } from ".";

describe("<Related/>", () => {
  it("renders correctly", async () => {
    const { getAllByTestId, getByTestId } = render(<Related />);

    expect(getByTestId("title")).toHaveTextContent(/related links/i);

    const links = getAllByTestId("link");

    expect(links.length).toBeGreaterThan(1);

    const [link] = links;

    userEvent.click(link);

    expect(getByTestId("location-display")).toHaveTextContent(
      link.getAttribute("href")
    );
  });
});
